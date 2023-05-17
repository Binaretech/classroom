import 'package:flutter_dotenv/flutter_dotenv.dart';

class Config {
  static bool get useHttps => dotenv.env['USE_HTTPS'] == 'true';

  static String get domain => dotenv.env['DOMAIN']!;

  static String get googleClientId => dotenv.env['GOOGLE_CLIENT_ID']!;
}
