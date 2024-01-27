import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ClassModule } from './modules/class/class.module';
import { UserModule } from './modules/user/user.module';
import { StorageModule } from './modules/storage/storage.module';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './modules/email/email.module';
import { LanguageModule } from './modules/language/language.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
    }),
    LanguageModule,
    EmailModule,
    DatabaseModule,
    FirebaseModule,
    ClassModule,
    UserModule,
    StorageModule,
  ],
  providers: [],
})
export class AppModule {}
