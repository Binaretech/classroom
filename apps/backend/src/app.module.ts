import { Module } from '@nestjs/common';
import { AuthStrategy } from './auth/auth.strategy';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    DatabaseModule,

    FirebaseModule,
  ],
  providers: [AuthStrategy],
})
export class AppModule {}
