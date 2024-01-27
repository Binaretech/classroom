import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { SendMailOptions } from 'nodemailer';
import * as nodemailer from 'nodemailer';

@Processor('email')
export class EmailProcessor {
  private transporter: nodemailer.Transporter;

  constructor(configService: ConfigService) {
    const config = {
      host: configService.get('email.host'),
      port: configService.get('email.port'),
      secure: configService.get('email.secure'),
      auth: configService.get('email.username') &&
        configService.get('email.password') && {
          user: configService.get('email.username'),
          pass: configService.get('email.password'),
        },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  @Process('sendEmail')
  handleTranscode(job: Job<SendMailOptions>) {
    return this.transporter.sendMail(job.data);
  }
}
