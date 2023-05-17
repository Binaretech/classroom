import 'package:classroom_mobile/models/token.dart';

/// Represents the auth response.
class AuthResource {
  final Token token;

  AuthResource(this.token);

  factory AuthResource.fromJson(Map<String, dynamic> json) {
    return AuthResource(Token.fromJson(json['token']));
  }
}
