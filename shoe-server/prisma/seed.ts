import { PrismaClient, RoleEnum, UserStatusEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import PROVINCES from '../src/mocks/provinces.json';

const prisma = new PrismaClient();

const main = async () => {
  /* Roles */
  await prisma.role.createMany({
    data: [
      {
        name: RoleEnum.ADMIN,
      },
      {
        name: RoleEnum.USER,
      },
    ],
  });
  /* Admin account */
  const roleAdmin = await prisma.role.findFirst({
    where: {
      name: RoleEnum.ADMIN,
    },
  });
  await prisma.user.create({
    data: {
      username: 'admin',
      password: bcrypt.hashSync(
        'admin123',
        parseInt(process.env.AUTH_SALT_ROUND),
      ),
      email: 'admin@gmail.com',
      phone: '0123456789',
      status: UserStatusEnum.ACTIVE,
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });
  //create sample city, district, ward
  for (const province of PROVINCES) {
    const provinceRecord = await prisma.cityReference.create({
      data: {
        name: province.name,
      },
    });
    for (const district of province.districts) {
      const districtRecord = await prisma.districtReference.create({
        data: {
          cityId: provinceRecord.id,
          name: district.name,
        },
      });
      for (const ward of district.wards) {
        await prisma.wardReference.create({
          data: {
            districtId: districtRecord.id,
            name: ward.name,
          },
        });
      }
    }
  }
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
} finally {
  prisma.$disconnect();
}
