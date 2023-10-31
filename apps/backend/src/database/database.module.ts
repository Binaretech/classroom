import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgresql',
        host: configService.get('database.host'),
        dbName: configService.get('database.name'),
        port: configService.get('database.port'),
        password: configService.get('database.password'),
        user: configService.get('database.user'),
      }),
    }),
  ],
})
export class DatabaseModule {}
