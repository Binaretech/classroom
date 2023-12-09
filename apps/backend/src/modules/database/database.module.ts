import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: ['./dist/src/modules/database/entities'],
        metadataProvider: TsMorphMetadataProvider,
        entitiesTs: ['./src/modules/database/entities'],
        type: 'postgresql',
        host: configService.get('database.host'),
        dbName: configService.get('database.name'),
        port: configService.get('database.port'),
        password: configService.get('database.password'),
        user: configService.get('database.user'),
        migrations: {
          path: './dist/src/modules/database/migrations',
          pathTs: './src/modules/database/migrations',
          transactional: true,
          allOrNothing: true,
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
