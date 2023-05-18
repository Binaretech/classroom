import 'package:classroom_mobile/http/request.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc({String token = ''})
      : super(AuthenticationState(token: token)) {
    if (token.isNotEmpty) {
      Request.setToken(token);
      MultipartRequest.setToken(token);
    }

    on<AuthenticateUser>(
      (event, emit) {
        Request.setToken(event.token);
        MultipartRequest.setToken(event.token);

        SharedPreferences.getInstance().then((prefs) {
          prefs.setString('token', event.token);
        });

        return emit(AuthenticationState(token: event.token));
      },
    );

    on<UnauthenticateUser>(
      (event, emit) {
        Request.setToken(null);

        SharedPreferences.getInstance().then((prefs) {
          prefs.remove('token');
        });

        return emit(const AuthenticationState());
      },
    );
  }
}
