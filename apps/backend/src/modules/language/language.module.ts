import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import * as i18next from 'i18next';
import es from './es';

@Module({
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {
  constructor() {
    i18next.init({
      lng: 'es',
      resources: {
        es: {
          translation: es,
        },
      },
    });
  }
}
