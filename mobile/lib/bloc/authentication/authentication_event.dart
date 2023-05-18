part of 'authentication_bloc.dart';

abstract class AuthenticationEvent extends Equatable {
  const AuthenticationEvent();

  @override
  List<Object> get props => [];
}

class AuthenticateUser extends AuthenticationEvent {
  final String token;

  const AuthenticateUser(this.token);

  @override
  List<Object> get props => [token];

  @override
  String toString() => 'AuthenticateUser { token: $token }';
}

class UnauthenticateUser extends AuthenticationEvent {
  const UnauthenticateUser();

  @override
  List<Object> get props => [];

  @override
  String toString() => 'UnauthenticateUser';
}
