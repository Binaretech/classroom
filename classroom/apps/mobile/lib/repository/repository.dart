import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/globals.dart';
import 'package:classroom_mobile/http/request.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HttpException extends Error {
  final Response response;

  HttpException(this.response);

  @override
  String toString() {
    return response.data.toString();
  }
}

abstract class Repository {
  void showSnackBar(String message,
      {Duration duration = const Duration(seconds: 3)}) {
    snackbarKey.currentState?.showSnackBar(SnackBar(
      content: Text(message),
      duration: duration,
    ));
  }

  /// Check if the response status is not 200 OK.
  /// if there is an error message, it is shown to the user with a snackbar.
  bool hasResponseErrors(Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return false;
    }

    if (checkUnauthenticated(response)) {
      return true;
    }

    snackbarKey.currentState?.showSnackBar(SnackBar(
      content: Text(extractErrorFromResponse(response.data)),
      duration: const Duration(seconds: 3),
    ));

    return true;
  }

  /// If the response status is 401 Unauthorized, the user is not logged in.
  /// The user is redirected to the login page and the user data is cleared.
  bool checkUnauthenticated(Response response) {
    if (response.statusCode == 401) {
      final authBloc =
          BlocProvider.of<AuthenticationBloc>(navigatorKey.currentContext!);

      authBloc.add(const UnauthenticateUser());

      navigatorKey.currentState
          ?.restorablePushNamedAndRemoveUntil('/login', (route) => false);
      return true;
    }

    return false;
  }

  /// Extracts the error message from the response.
  String extractErrorFromResponse(Map<String, dynamic> data) {
    if (data.containsKey('validationErrors')) {
      return extractValidationErrors(
          data['validationErrors'] as Map<String, dynamic>);
    }

    if (data.containsKey('message') && data['message'] is String) {
      return data['message'];
    }

    if (data.containsKey('message')) {
      return extractErrorFromResponse(data['message']);
    }

    if (data.containsKey('error')) {
      return data['error'];
    }

    return 'Unknown error';
  }

  /// Format the validation errors into a string.
  String extractValidationErrors(Map<String, dynamic> validationErrors) {
    return validationErrors.values.map((error) => error.join(', ')).join('\n');
  }

  void close();
}
