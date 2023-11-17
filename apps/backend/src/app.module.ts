import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ClassModule } from './modules/class/class.module';

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
  ],
})
export class AppModule {}
