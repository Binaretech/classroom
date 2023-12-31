interface UrlOptions {
  queryParams?: Record<string, string | number | boolean>;
}

export class UrlFormatter {
  static formatUrl(path: string, options?: UrlOptions): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_BASE_URL;
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
