import 'dart:convert';

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import './auth_repository_test.mocks.dart';

@GenerateMocks([Request])
void main() {
  setUp(() async {
    await dotenv.load();
  });

  tearDown(() {
    GetIt.I.reset();
  });

  group('Test auth repository', () {
    test('Test login', () async {
      final responseData = {
        'token': {
          'accessToken': 'test_token',
          'refreshToken': 'test_refresh_token',
          'accessExpires': DateTime.now().millisecondsSinceEpoch,
        }
      };

      final loginData = {'email': 'test@mail.com', 'password': 'test'};

      final request = MockRequest();

      when(request.post(
        '/auth/login',
        headers: {},
        encoding: null,
        body: jsonEncode(loginData),
      )).thenAnswer((_) async => Response(200, responseData));

      GetIt.I.registerFactory<Request>(() => request);

      final repository = AuthRepositoryImplementation();

      final result =
          await repository.login(loginData['email']!, loginData['password']!);

      expect(result.token.accessToken, responseData['token']!['accessToken']);
    });
  });
}
