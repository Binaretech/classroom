import 'dart:io' as io;

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/repository.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:mime/mime.dart';

abstract class UserRepository extends Repository {
  /// Gets the user data from the API
  Future<User?> info();

  /// Sends a request to store the user data.
  Future<User> store(
      {required String name, required String lastname, io.File? avatar});

  /// Search users by email.
  Future<List<User>> searchByEmail({required search});
}

class UserRepositoryImplementation extends UserRepository {
  final Request _client;
  final MultipartRequest? _multipartClient;

  UserRepositoryImplementation({MultipartRequest? multipartClient})
      : _client = GetIt.I<Request>(),
        _multipartClient = multipartClient ?? MultipartRequest();

  /// Fetch the user data.
  @override
  Future<User?> info() async {
    final response = await _client.get('/api/users');

    if (response.statusCode == 404) {
      return null;
    }

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return User.fromMap(response.data);
  }

  /// Sends a request to store user data.
  @override
  Future<User> store({
    required String name,
    required String lastname,
    io.File? avatar,
  }) async {
    if (_multipartClient == null) {
      throw Exception('Multipart client is null');
    }

    final response = await _multipartClient!.post(
      '/api/users',
      body: {
        'name': name,
        'lastname': lastname,
      },
      files: avatar != null
          ? [
              http.MultipartFile.fromBytes(
                'image',
                (await avatar.readAsBytes()).toList(),
                contentType: MediaType.parse(
                    lookupMimeType(avatar.path) ?? 'image/jpeg'),
                filename: 'avatar.jpeg',
              )
            ]
          : null,
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return User.fromMap(response.data);
  }

  @override
  Future<List<User>> searchByEmail({required search}) async {
    final response = await _client.get('/api/users/email', queryParameters: {
      'search': search,
    });

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return User.fromList(response.data['data'] as List<dynamic>);
  }

  @override
  void close() {
    _client.close();
  }
}
