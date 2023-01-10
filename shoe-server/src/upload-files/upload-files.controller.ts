import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IResponse } from 'src/common/dto/response.dto';
import { parse } from 'path';
import { ConfigService } from '@nestjs/config';
@Controller('upload-files')
@ApiTags('Upload files')
export class UploadFilesController {
  constructor(private readonly configService: ConfigService) {}
  @Post('/push')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RolesGuard)
  @ApiOperation({ summary: 'Upload file to server' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const parsedFile = parse(file.originalname);
          callback(null, `${parsedFile.name}-${Date.now()}${parsedFile.ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<IResponse> {
    console.log(file);
    return {
      statusCode: HttpStatus.OK,
      message: 'Upload file successfully!',
      data: this.configService.get('IMAGE_SAVE_PRE_PATH') + file.filename,
    };
  }
}
