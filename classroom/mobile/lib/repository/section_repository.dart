import 'dart:convert';

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/repository.dart';

abstract class SectionRepository extends Repository {
  /// Fetch a paginated list of sections by class ID.
  Future<PaginatedData<Section>> get(int classId, {int page = 1});

  /// Fetch a single section by ID.
  Future<Section> show(int id);

  /// Sends a request to API to create a new section for the given class ID
  Future<Section> create({required int classId, required String name});

  /// Fetch section members by section ID.
  Future<PaginatedData<User>> members(int sectionId, {int page = 1});

  /// Remove a member from a section
  Future<bool> removeMember(int sectionId, String userId);

  /// Add a new member to a section
  Future<bool> addMember(int sectionId, String email);

  /// Delete a section
  Future<bool> delete(int sectionId);
}

class SectionRepositoryImplementation extends SectionRepository {
  final Request _client;

  SectionRepositoryImplementation({Request? client})
      : _client = client ?? Request();

  @override
  Future<PaginatedData<Section>> get(int classId, {int page = 1}) async {
    final response = await _client.get(
      '/api/classes/$classId/sections',
      queryParameters: {
        'page': page.toString(),
      },
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, Section.fromList);
  }

  @override
  Future<Section> show(int id) async {
    final response = await _client.get('/api/sections/$id');

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return Section.fromMap(response.data);
  }

  @override
  Future<Section> create({required int classId, required String name}) async {
    final response = await _client.post('/api/sections',
        body: jsonEncode({
          'classId': classId,
          'name': name,
        }),
        headers: {
          'Content-Type': 'application/json',
        });

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return Section.fromMap(response.data['data']);
  }

  @override
  Future<PaginatedData<User>> members(int sectionId, {int page = 1}) async {
    final response = await _client.get(
      '/api/sections/$sectionId/members',
      queryParameters: {
        'page': page.toString(),
      },
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, User.fromList);
  }

  @override
  Future<bool> addMember(int sectionId, String email) async {
    final response = await _client.post('/api/sections/$sectionId/members',
        body: jsonEncode({
          'email': email,
        }),
        headers: {
          'Content-Type': 'application/json',
        });

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return true;
  }

  @override
  Future<bool> removeMember(int sectionId, String userId) async {
    final response = await _client.delete(
      '/api/sections/$sectionId/members/$userId',
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    showSnackBar(response.data['message']);

    return true;
  }

  @override
  Future<bool> delete(int sectionId) async {
    final response = await _client.delete('/api/sections/$sectionId');

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
