part of 'authentication_bloc.dart';

class AuthenticationState extends Equatable {
  final String token;

  const AuthenticationState({
    this.token = '',
  });

  bool get isAutheticated => token.isNotEmpty;

  @override
  List<Object> get props => [token];
}
