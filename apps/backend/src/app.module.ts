import { Module } from '@nestjs/common';
import { AuthStrategy } from './auth/auth.strategy';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [AuthStrategy],
})
export class AppModule {}
