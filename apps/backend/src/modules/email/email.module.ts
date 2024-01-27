import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { LanguageModule } from '../language/language.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
    LanguageModule,
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService],
})
export class EmailModule {}
