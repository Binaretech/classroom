import 'package:classroom_mobile/http/request.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get_it/get_it.dart';
import 'package:mockito/annotations.dart';

@GenerateMocks([Request])
void main() {
  tearDown(() {
    GetIt.I.reset();
  });

  group('Test class repository', () {
    // test('Test get user', () async {
    //   const user =
    //       UserResource(id: '1231asd-1231-s1231', name: 'John', lastname: 'Doe');

    //   final request = MockRequest();

    //   when(request.get('/api/users',
    //           headers: {}, encoding: null, queryParameters: null))
    //       .thenAnswer((_) async => Response(200, (user.toMap())));

    //   GetIt.I.registerFactory<Request>(() => request);

    //   final repository = UserRepositoryImplementation();

    //   final result = await repository.info();

    //   expect(result!.name, user.name);
    // });
  });
}
