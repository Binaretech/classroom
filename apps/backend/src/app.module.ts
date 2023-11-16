import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ClassModule } from './modules/class/class.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    FirebaseModule,
    ClassModule,
    AuthModule,
  ],
})
export class AppModule {}
