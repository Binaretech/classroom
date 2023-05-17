import 'dart:convert';

import 'package:classroom_mobile/config/config.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

/// This class manager the response data
class Response {
  final int statusCode;
  final Map<String, dynamic> data;

  Response(this.statusCode, this.data);
}

/// Manage the request to the server and return the response
class Request {
  final http.Client _client;

  Request({http.Client? client}) : _client = client ?? http.Client();

  static String? _token;

  static void setToken(String? token) {
    _token = token;
  }

  /// Send a post request to the server with the given [url] and [body]
  Future<Response> post(
    String path, {
    Map<String, String> headers = const {},
    Object? body,
    Encoding? encoding,
  }) async {
    try {
      final response = await _client.post(formatUri(path),
          body: body,
          headers: _generateHeaders(headers),
          encoding: encoding ?? Encoding.getByName('utf-8'));

      return _parseResponse(response);
    } catch (e) {
      throw Response(0, {
        'error': e,
      });
    }
  }

  /// Send a post request to the server with the given [path] and [body]
  Future<Response> get(
    String path, {
    Map<String, String> headers = const {},
    Encoding? encoding,
    Map<String, String>? queryParameters,
  }) async {
    try {
      final response = await _client.get(formatUri(path, queryParameters),
          headers: _generateHeaders(headers));

      return _parseResponse(response);
    } catch (e) {
      throw Response(0, {
        'error': e,
      });
    }
  }

  /// Send a put request to the server with the given [path]
  Future<Response> put(
    String path, {
    Map<String, String> headers = const {},
    Object? body,
    Encoding? encoding,
  }) async {
    try {
      final response = await _client.post(formatUri(path),
          body: body,
          headers: _generateHeaders(headers),
          encoding: encoding ?? Encoding.getByName('utf-8'));

      return _parseResponse(response);
    } catch (e) {
      throw Response(0, {
        'error': e,
      });
    }
  }

  /// Send a delete request to the server with the given [path]
  Future<Response> delete(
    String path, {
    Map<String, String> headers = const {},
    Encoding? encoding,
    Map<String, String>? queryParameters,
  }) async {
    try {
      final response = await _client.delete(formatUri(path, queryParameters),
          headers: _generateHeaders(headers));

      return _parseResponse(response);
    } catch (e) {
      throw Response(0, {
        'error': e,
      });
    }
  }

  Map<String, String> _generateHeaders(Map<String, String> headers) {
    return {}
      ..addAll(_token != null ? {'Authorization': 'Bearer $_token'} : {})
      ..addAll({'Content-Type': 'application/json'})
      ..addAll({'Accept': 'application/json'})
      ..addAll({"Locale": GetIt.I<Locale>().languageCode})
      ..addAll(headers);
  }

  Response _parseResponse(http.Response response) {
    return Response(
        response.statusCode,
        response.bodyBytes.isNotEmpty
            ? json.decode(utf8.decode(response.bodyBytes))
            : {});
  }

  void close() {
    _client.close();
  }
}

class MultipartRequest {
  final http.MultipartRequest Function()? clientFactory;

  MultipartRequest({this.clientFactory});

  static String? _token;

  static void setToken(String? token) {
    _token = token;
  }

  http.MultipartRequest _generateClient(String method, String path) {
    if (clientFactory != null) {
      return clientFactory!();
    }

    return http.MultipartRequest(method, formatUri(path));
  }

  Future<Response> post(
    String path, {
    Map<String, String> headers = const {},
    Map<String, String>? body,
    Encoding? encoding,
    List<http.MultipartFile>? files,
  }) async {
    try {
      final Map<String, String> requestHeaders = {}
        ..addAll(_token != null ? {'Authorization': 'Bearer $_token'} : {})
        ..addAll(headers);

      final client = _generateClient('POST', path);

      client.headers.addAll(requestHeaders);

      if (body != null) {
        client.fields.addAll(body);
      }

      if (files != null) {
        client.files.addAll(files);
      }

      final res = await client.send();

      return Response(
          res.statusCode, json.decode(utf8.decode(await res.stream.toBytes())));
    } catch (e) {
      throw Response(0, {});
    }
  }
}

Uri formatUri(String path, [Map<String, String>? queryParameters]) {
  return Config.useHttps
      ? Uri.https(Config.domain, path, queryParameters)
      : Uri.http(Config.domain, path, queryParameters);
}
