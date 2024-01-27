import { Injectable } from '@nestjs/common';
import * as i18next from 'i18next';

@Injectable()
export class LanguageService {
  translate(key: string, options?: { [key: string]: string }) {
    return i18next.t(key, options);
  }
}
