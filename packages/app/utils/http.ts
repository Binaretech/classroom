import { baseUrl } from 'app/config/env';

interface UrlOptions {
  queryParams?: Record<string, string | number | boolean>;
}

export class UrlFormatter {
  static formatUrl(path: string, options?: UrlOptions): string {
    let url = `${baseUrl}/${path}`;

    if (options?.queryParams) {
      const params = Object.keys(options.queryParams).map((key) => {
        const value = options.queryParams![key];
        return `${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
      });

      url += `?${params.join('&')}`;
    }

    return url;
  }
}
