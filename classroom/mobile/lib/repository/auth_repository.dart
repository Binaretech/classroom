import 'dart:convert';

import 'package:classroom_mobile/config/config.dart';
import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/repository/resources/auth_resource.dart';
import 'package:classroom_mobile/repository/repository.dart';
import 'package:get_it/get_it.dart';
import 'package:google_sign_in/google_sign_in.dart';

abstract class AuthRepository extends Repository {
  Future<AuthResource> login(String username, String password);
  Future<AuthResource> register(String username, String password);
  Future<AuthResource?> googleSignIn();
  Future<bool> logout();
}

class AuthRepositoryImplementation extends AuthRepository {
  final Request _client;

  final GoogleSignIn _googleSignIn;

  AuthRepositoryImplementation()
      : _client = GetIt.I.get<Request>(),
        _googleSignIn = GoogleSignIn(
          clientId: Config.googleClientId,
          scopes: ['email', "https://www.googleapis.com/auth/userinfo.profile"],
        );

  /// Sends a request to login the user with the given credentials.
  @override
  Future<AuthResource> login(String email, String password) async {
    final response = await _client.post(
      '/auth/login',
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return AuthResource.fromJson(response.data);
  }

  /// Sends a request to register the user.
  @override
  Future<AuthResource> register(String email, String password) async {
    final response = await _client.post(
      '/auth/register',
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return AuthResource.fromJson(response.data);
  }

  /// Try to login the user with the given Google ID token.
  @override
  Future<AuthResource?> googleSignIn() async {
    final account = await _googleSignIn.signIn();

    if (account == null) return null;

    final auth = await account.authentication;
    final idToken = auth.idToken;

    if (idToken == null) return null;

    final response = await _client.post(
      '/auth/google',
      body: jsonEncode({'idToken': idToken}),
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return AuthResource.fromJson(response.data);
  }

  /// Sends a request to logout the user.
  /// Returns true if the request was successful.
  /// Returns false if the request failed.
  @override
  Future<bool> logout() async {
    final response = await _client.post('/auth/logout');

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return true;
  }

  @override
  void close() {
    _client.close();
  }
}
