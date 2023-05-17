import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/modules/home/home.dart';
import 'package:classroom_mobile/modules/home/widgets/register_user_info.dart';
import 'package:classroom_mobile/repository/class_repository.dart';
import 'package:classroom_mobile/repository/resources/user_resource.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:classroom_mobile/widgets/app_bloc_builder.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '../../app_wrapper.dart';
import 'home_test.mocks.dart';

@GenerateMocks([UserRepository, ClassRepository])
void main() async {
  setUp(() async {
    await dotenv.load();
  });

  tearDown(() {
    GetIt.I.reset();
  });

  testWidgets('Home page', (WidgetTester tester) async {
    final userRepository = MockUserRepository();

    when(userRepository.info())
        .thenAnswer((_) => Future.value(const UserResource(
              id: '123',
              name: 'test',
              lastname: 'test',
              email: 'test@mail.com',
            )));

    final classRepository = MockClassRepository();

    when(classRepository.get(page: 1)).thenAnswer((_) => Future.value(
        const PaginatedData(data: [], limit: 10, page: 1, pages: 1, total: 1)));

    GetIt.I.registerFactory<UserRepository>(() => userRepository);

    GetIt.I.registerFactory<ClassRepository>(() => classRepository);

    await tester.pumpWidget(AppWrapper(
      child: AppBlocBuilder(
        builder: (_, a, b) => const Home(),
      ),
    ));

    expect(find.text('Classroom'), findsOneWidget);

    expect(find.byType(AppBar), findsOneWidget);

    expect(find.byType(FloatingActionButton), findsOneWidget);

    await tester.pumpAndSettle();

    expect(find.byType(CircularProgressIndicator), findsNothing);

    expect(find.byType(PullToRefreshList), findsOneWidget);
  });

  testWidgets('Test user info overlay', (WidgetTester tester) async {
    final repository = MockUserRepository();

    when(repository.info()).thenAnswer((_) => Future.value(null));

    when(repository.store(name: 'test', lastname: 'test'))
        .thenAnswer((_) => Future.value(const UserResource(
              id: '1',
              name: 'test',
              lastname: 'test',
              email: 'test@mail.com',
            )));

    final classRepository = MockClassRepository();

    when(classRepository.get(page: 1)).thenAnswer((_) => Future.value(
        const PaginatedData(data: [], limit: 10, page: 1, pages: 1, total: 1)));

    GetIt.I.registerFactory<ClassRepository>(() => classRepository);

    GetIt.I.registerFactory<UserRepository>(() => repository);

    await tester.pumpWidget(AppWrapper(
      child: AppBlocBuilder(
        builder: (_, a, b) => const Home(),
      ),
    ));

    await tester.pumpAndSettle();

    expect(find.byType(RegisterUserInfo), findsOneWidget);

    await tester.enterText(find.byType(TextInput).first, 'test');

    await tester.enterText(find.byType(TextInput).last, 'test');

    await tester.tap(find.text(
        Lang(const Locale('en')).trans('messages.continue').toUpperCase()));
  });
}
