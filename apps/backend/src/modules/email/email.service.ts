import { Injectable } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { LanguageService } from '../language/language.service';
@Injectable()
export class EmailService {
  private readonly fromAddress: string;

  private readonly baseUrl: string;

  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    configService: ConfigService,
    languageService: LanguageService,
  ) {
    this.fromAddress = configService.get('email.fromAddress');

    this.baseUrl = configService.get('frontend.url');

    handlebars.registerHelper('trans', (key: string, context: any) => {
      return languageService.translate(key, context.data.root);
    });
  }

  async sendEmail<T>(
    to: string,
    subject: string,
    templateName: string,
    data: T,
  ) {
    const template = readFileSync(
      join(__dirname, 'templates', `${templateName}.hbs`),
      'utf8',
    );

    const compiledTemplate = handlebars.compile(template);
    const html = compiledTemplate({
      ...data,
      baseUrl: this.baseUrl,
    });

    const email: SendMailOptions = {
      from: this.fromAddress,
      to,
      subject,
      html,
    };

    this.emailQueue.add('sendEmail', email);
  }
}
