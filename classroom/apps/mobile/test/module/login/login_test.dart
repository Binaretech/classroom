import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/auth/login.dart';
import 'package:classroom_mobile/modules/auth/register.dart';
import 'package:classroom_mobile/modules/auth/widgets/google_sign_in_button.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:classroom_mobile/repository/resources/auth_resource.dart';
import 'package:classroom_mobile/models/token.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '../../app_wrapper.dart';
import 'login_test.mocks.dart';

class MockNavigatorObserver extends Mock implements NavigatorObserver {}

@GenerateMocks([AuthRepository])
void main() async {
  setUp(() async {
    await dotenv.load();
  });

  tearDown(() {
    GetIt.I.reset();
  });

  testWidgets('Test login', (WidgetTester tester) async {
    final bloc = AuthenticationBloc();

    final authRepository = MockAuthRepository();

    when(authRepository.login('test@mail.com', 'test')).thenAnswer((_) =>
        Future.value(
            AuthResource(Token('test_token', 'test_refresh', DateTime.now()))));

    GetIt.I.registerFactory<AuthRepository>(() => authRepository);

    await tester.pumpWidget(AppWrapper(
      child: BlocProvider(
        create: (_) => bloc,
        child: const Login(),
      ),
    ));

    await tester.enterText(find.byType(TextInput).first, 'test@mail.com');
    await tester.enterText(find.byType(TextInput).last, 'test');

    await tester.tap(find
        .text(Lang(const Locale('en')).trans('messages.accept').toUpperCase()));

    await tester.pump();

    expect(find.byType(LinearProgressIndicator), findsOneWidget);

    await tester.pumpAndSettle();

    expect(find.byType(LinearProgressIndicator), findsNothing);

    expect(bloc.state.token, 'test_token');
  });

  testWidgets('Test login with google', (WidgetTester tester) async {
    final bloc = AuthenticationBloc();

    final authRepository = MockAuthRepository();

    when(authRepository.googleSignIn()).thenAnswer((_) => Future.value(
        AuthResource(Token('test_token', 'test_refresh', DateTime.now()))));

    GetIt.I.registerFactory<AuthRepository>(() => authRepository);

    await tester.pumpWidget(AppWrapper(
      child: BlocProvider(
        create: (_) => bloc,
        child: const Login(),
      ),
    ));

    await tester.tap(find.byType(GoogleSignInButton));

    await tester.pumpAndSettle();
  });

  testWidgets('Test go to register', (WidgetTester tester) async {
    final bloc = AuthenticationBloc();

    final observer = MockNavigatorObserver();

    final register = MaterialPageRoute(builder: (_) => const Register());
    final login = MaterialPageRoute(builder: (_) => const Login());

    GetIt.I.registerFactory<AuthRepository>(() => MockAuthRepository());

    await tester.pumpWidget(AppWrapper(
      observers: [observer],
      onGenerateRoute: ((settings) {
        if (settings.name == Register.route) {
          return register;
        }

        return login;
      }),
      child: BlocProvider(
        create: (_) => bloc,
        child: const Login(),
      ),
    ));

    await tester.tap(find.text(Lang(const Locale('en'))
        .trans('views.login.register', capitalize: true)));

    await tester.pumpAndSettle();

    verify(observer.didPush(register, any));
  });
}
