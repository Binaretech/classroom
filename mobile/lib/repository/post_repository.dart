import 'dart:io' as io;
import 'package:http/http.dart' as http;
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/post.dart';
import 'package:classroom_mobile/repository/repository.dart';
import 'package:path/path.dart';

class DeltaReplace {
  final String path;
  final String replace;

  const DeltaReplace(this.path, this.replace);
}

abstract class PostRepository extends Repository {
  /// Fetch a paginated list of section posts.
  Future<PaginatedData<Post>> get(int sectionId, {int page = 1});

  /// Fetch a paginated list of recent posts.
  Future<PaginatedData<Post>> recent({int page = 1});

  /// Create a new post.
  Future<Post> create(int sectionId, String content,
      [List<io.File> files = const []]);
}

class PostRepositoryImplementation extends PostRepository {
  final Request _client;
  final MultipartRequest _multipartClient;

  PostRepositoryImplementation(
      {Request? client, MultipartRequest? multipartClient})
      : _client = client ?? Request(),
        _multipartClient = multipartClient ?? MultipartRequest();

  @override
  Future<PaginatedData<Post>> get(int sectionId, {int page = 1}) async {
    final response = await _client.get(
      '/api/sections/$sectionId/posts',
      queryParameters: {
        'page': page.toString(),
      },
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, Post.fromList);
  }

  @override
  Future<PaginatedData<Post>> recent({int page = 1}) async {
    final response = await _client.get(
      '/api/posts/recent',
      queryParameters: {
        'page': page.toString(),
      },
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return PaginatedData.fromJson(response.data, Post.fromList);
  }

  @override
  Future<Post> create(int sectionId, String content,
      [List<io.File> files = const []]) async {
    final multipartFiles = List<http.MultipartFile>.empty(growable: true);

    final replaces = List<DeltaReplace>.empty(growable: true);

    for (int i = 0; i < files.length; i++) {
      final file = files[i];
      final filename = basename(file.path);

      replaces.add(DeltaReplace(file.path, filename));

      multipartFiles.add(await http.MultipartFile.fromPath(
        'files',
        file.path,
        contentType: MediaType.parse(lookupMimeType(file.path) ?? 'image/jpeg'),
        filename: filename,
      ));
    }

    final delta = replaces.fold<String>(content,
        (acc, element) => acc.replaceAll(element.path, "\$${element.replace}"));

    final response = await _multipartClient.post(
      '/api/sections/$sectionId/posts',
      body: {"content": delta},
      files: multipartFiles,
    );

    if (hasResponseErrors(response)) {
      throw HttpException(response);
    }

    return Post.fromJson(response.data['data']);
  }

  @override
  void close() {
    _client.close();
  }
}
