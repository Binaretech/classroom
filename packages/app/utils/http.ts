import { baseUrl } from 'app/config/env';

interface UrlOptions {
  queryParams?: Record<string, string | number | boolean>;
}

export class UrlFormatter {
  static formatUrl(path: string, options?: UrlOptions): string {
    let url = `${baseUrl}/${path}`;

    if (options?.queryParams) {
      const params = new URLSearchParams(
        Object.entries(options.queryParams).map(([key, value]) => [key, String(value)])
      ).toString();
      url += `?${params}`;
    }

    return url;
  }
}
