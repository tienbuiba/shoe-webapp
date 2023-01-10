import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotAcceptableException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleEnum, User, UserStatusEnum, UserTypeEnum } from '@prisma/client';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { IResponse } from 'src/common/dto/response.dto';
import { OtpTokensService } from 'src/otp-tokens/otp-tokens.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetNewPasswordDto } from './dto/set-new-password.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Serialize } from './interceptors/serialize.interceptor';

@Controller('auth')
@ApiTags('Authentication')
@Serialize()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
    private readonly configService: ConfigService,
    private readonly otpTokenService: OtpTokensService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(@Body() registerDto: RegisterDto): Promise<IResponse> {
    let existedUser = await this.usersService.findOne({
      email: registerDto.email,
    });
    if (existedUser) {
      throw new BadRequestException('Email address already exists.');
    }
    existedUser = await this.usersService.findOne({
      username: registerDto.username,
    });
    if (existedUser) {
      throw new BadRequestException('Username already exist.');
    }
    const role = await this.roleService.findOne({
      name: RoleEnum.USER,
    });
    if (!role) {
      throw new InternalServerErrorException('Role USER is not found!');
    }

    const hashedPassword = await this.authService.hashPassword(
      registerDto.password,
    );

    await this.usersService.create({
      data: {
        ...registerDto,
        password: hashedPassword,
        status: UserStatusEnum.ACTIVE,
        role: {
          connect: {
            id: role.id,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Register successfully.',
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto): Promise<IResponse> {
    const userExisted = await this.usersService.findOne({
      email: loginDto.email,
      role: {
        name: {
          not: RoleEnum.ADMIN,
        },
      },
    });
    if (!userExisted) {
      throw new UnauthorizedException('Email address is not correct.');
    }
    if (userExisted.status === UserStatusEnum.BLOCKED) {
      throw new ForbiddenException('User is blocked!');
    }
    if (userExisted.type === UserTypeEnum.GOOGLE) {
      throw new NotAcceptableException('Please try login with Google Account!');
    }

    const isMatch = await this.authService.comparePassword(
      loginDto.password,
      userExisted.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: userExisted.id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully.',
      data: {
        accessToken: token,
        expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    };
  }

  @Post('/admin/login')
  @ApiOperation({ summary: 'Login Admin' })
  async loginAdmin(@Body() loginAdminDto: LoginAdminDto): Promise<IResponse> {
    const userExisted = await this.usersService.findOne({
      email: loginAdminDto.email,
      role: {
        name: {
          equals: RoleEnum.ADMIN,
        },
      },
    });
    if (!userExisted) {
      throw new UnauthorizedException('Email address is not correct.');
    }

    const isMatch = await this.authService.comparePassword(
      loginAdminDto.password,
      userExisted.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: userExisted.id,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully.',
      data: {
        accessToken: token,
        expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    };
  }
  @Post('change-password')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<IResponse> {
    const isMatch = await this.authService.comparePassword(
      changePasswordDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const newHashedPassword = await this.authService.hashPassword(
      changePasswordDto.newPassword,
    );
    await this.usersService.update(user.id, {
      password: newHashedPassword,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Change password successfully.',
    };
  }
  @Post('forgot-password')
  @ApiOperation({ summary: 'forgot password' })
  async sendOtpForgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IResponse> {
    const existUser = await this.usersService.findOne({
      email: forgotPasswordDto.email,
    });
    if (!existUser) {
      throw new BadRequestException(
        `User not found with email: ${forgotPasswordDto.email}`,
      );
    }
    const otpToken: string = randomUUID();
    const expireTime = parseInt(this.configService.get('OTP_TOKEN_EXPIRES_IN'));
    await this.otpTokenService.create({
      data: {
        userId: existUser.id,
        usedOk: 0,
        token: otpToken,
        expiredAt: new Date(Date.now() + expireTime * 60000),
      },
    });
    await this.authService.sendForgotPasswordLink(
      existUser.username,
      existUser.email,
      otpToken,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Send forgot password request successfully.',
    };
  }

  @Post('set-new-password')
  @ApiOperation({ summary: 'Set new password' })
  async updatePassword(
    @Body() setNewPassword: SetNewPasswordDto,
  ): Promise<IResponse> {
    const existOtpToken = await this.otpTokenService.findOne({
      token: setNewPassword.token,
      usedOk: 0,
      expiredAt: {
        gte: new Date(),
      },
    });
    if (!existOtpToken) {
      throw new UnauthorizedException('Invalid otp token!');
    }
    await this.otpTokenService.updateUsedOk(existOtpToken.id);
    const newHashedPassword = await this.authService.hashPassword(
      setNewPassword.newPassword,
    );
    await this.usersService.update(existOtpToken.userId, {
      password: newHashedPassword,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Set new password successfully.',
    };
  }

  @Post('/login-with-google')
  @ApiOperation({ summary: 'Login with Google API' })
  async loginWithGoogle(
    @Body('credential') credential: string,
  ): Promise<IResponse> {
    const client = new OAuth2Client(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
    );
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });
    const { email, name, picture } = ticket.getPayload();
    const existedUser = await this.usersService.findOne({
      email: email,
    });
    let token: string;
    if (!existedUser) {
      //create new user
      const role = await this.roleService.findOne({
        name: RoleEnum.USER,
      });
      const newUser = await this.usersService.create({
        data: {
          email: email,
          username: name,
          avatarUrl: picture,
          type: UserTypeEnum.GOOGLE,
          password: '',
          status: UserStatusEnum.ACTIVE,
          role: {
            connect: {
              id: role.id,
            },
          },
        },
      });
      token = this.jwtService.sign({
        id: newUser.id,
      });
    } else {
      token = this.jwtService.sign({
        id: existedUser.id,
      });
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully!',
      data: {
        accessToken: token,
        expiresIn: this.configService.get('AUTH_JWT_TOKEN_EXPIRES_IN'),
      },
    };
  }
}
