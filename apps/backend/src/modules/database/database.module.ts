import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/src/modules/database/entities'],
        entitiesTs: ['./src/modules/database/entities'],
        type: 'postgresql',
        host: configService.get('database.host'),
        dbName: configService.get('database.name'),
        port: configService.get('database.port'),
        password: configService.get('database.password'),
        user: configService.get('database.user'),
        migrations: {
          path: './dist/src/database/migrations',
          pathTs: './src/database/migrations',
          transactional: true,
          allOrNothing: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
