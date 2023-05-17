import 'dart:convert';

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/models/class.dart';
import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/repository.dart';

abstract class ClassRepository extends Repository {
  /// Fetch a paginated list of classes that the user is a member of.
  Future<PaginatedData<Class>> get({int page});

  /// Fetch a single class.
  Future<Class> show(int id);

  /// Fetch a paginated list of members of a class.
  Future<PaginatedData<User>> members(int id, {int page});

  /// Create a new class and return the class data.
  Future<Class> create({required String name, String? description});

  /// Archive a class. This will remove the class from the user's list of classes. The class will still be accessible by the teacher. The teacher can unarchive the class.
  Future<bool> archive(int id);

  /// Unarchive a class. This will add the class to the user's list of classes. The class will still be accessible by the teacher. The teacher can archive the class.
  Future<bool> unarchive(int id);

  /// Delete a class.
  Future<bool> delete(int id);
}

class ClassRepositoryImplementation extends ClassRepository {
  final Request _client;

  ClassRepositoryImplementation({Request? client})
      : _client = client ?? Request();

  @override
  Future<Class> create({required String name, String? description}) async {
    final response = await _client.post(
      '/api/classes',
      body: jsonEncode({
        'name': name,
        'description': description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return Class.fromMap(response.data['data']);
  }

  @override
  Future<Class> show(int id) async {
    final response = await _client.get('/api/classes/$id');

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return Class.fromMap(response.data);
  }

  /// Fetch a paginated list of classes that the user is a member of.
  @override
  Future<PaginatedData<Class>> get({int page = 1}) async {
    final response = await _client.get('/api/classes', queryParameters: {
      'page': page.toString(),
    });

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, Class.fromList);
  }

  /// Fetch a paginated list of members of a class.
  @override
  Future<PaginatedData<User>> members(int id, {int page = 1}) async {
    final path = '/api/classes/$id/members';

    final response = await _client.get(path, queryParameters: {
      'page': page.toString(),
    });

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, (data) => User.fromList(data));
  }

  @override
  Future<bool> archive(int id) async {
    final path = '/api/classes/$id/archive';

    final response = await _client.post(path);

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return true;
  }

  @override
  Future<bool> unarchive(int id) async {
    final path = '/api/classes/$id/unarchive';

    final response = await _client.post(path);

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return true;
  }

  @override
  Future<bool> delete(int id) async {
    final response = await _client.delete('/api/classes/$id');

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return true;
  }

  @override
  void close() {
    _client.close();
  }
}
