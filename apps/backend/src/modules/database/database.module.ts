import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        entities: [path.join(__dirname, 'entities')],
        type: 'postgresql',
        host: configService.get('database.host'),
        dbName: configService.get('database.name'),
        port: configService.get('database.port'),
        password: configService.get('database.password'),
        user: configService.get('database.user'),
        migrations: {
          path: path.join('dist', 'src', 'database', 'migrations'),
          pathTs: path.join('src', 'database', 'migrations'),
          transactional: true,
          allOrNothing: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
