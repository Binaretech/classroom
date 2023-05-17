import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

final searchUserByEmailProvider =
    FutureProvider.autoDispose.family<List<User>, String>((ref, email) async {
  final repository = GetIt.I<UserRepository>();

  final response = await repository.searchByEmail(search: email);

  return response;
});

final authUserProvider = FutureProvider.autoDispose<User?>((ref) async {
  final repository = GetIt.I<UserRepository>();

  final response = await repository.info();

  return response;
});
