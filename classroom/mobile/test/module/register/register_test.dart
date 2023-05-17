import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/auth/register.dart';
import 'package:classroom_mobile/register_providers.dart';
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
import 'register_test.mocks.dart';

@GenerateMocks([AuthRepository])
void main() {
  setUp(() async {
    await dotenv.load();
    registerProviders();
  });

  tearDown(() {
    GetIt.I.reset();
  });

  testWidgets('Test register screen', (WidgetTester tester) async {
    final repository = MockAuthRepository();

    when(repository.register('test@mail.com', 'test')).thenAnswer((_) =>
        Future.value(
            AuthResource(Token('test_token', 'test_refresh', DateTime.now()))));

    await tester.pumpWidget(AppWrapper(
      child: BlocProvider(
        create: (_) => AuthenticationBloc(),
        child: const Register(),
      ),
    ));

    await tester.enterText(find.byType(TextInput).first, 'test@mail.com');
    await tester.enterText(find.byType(TextInput).last, 'test');

    await tester.tap(find
        .text(Lang(const Locale('en')).trans('messages.accept').toUpperCase()));
  });
}
