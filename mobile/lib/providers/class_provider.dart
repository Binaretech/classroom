import 'package:classroom_mobile/models/class.dart';
import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/pagination_params.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/class_repository.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

final classProvider =
    FutureProvider.autoDispose.family<Class, int>((ref, id) async {
  final repository = GetIt.I<ClassRepository>();

  final response = await repository.show(id);

  return response;
});

final paginatedClassProvider = FutureProvider.autoDispose
    .family<PaginatedData<Class>, int>((ref, page) async {
  final repository = GetIt.I<ClassRepository>();

  final response = await repository.get(page: page);

  return response;
});

final classPaginationProvider =
    FutureProvider.autoDispose<PaginationParams>((ref) async {
  final repository = GetIt.I<ClassRepository>();

  final response = await repository.get(page: 1);

  return PaginationParams(
    limit: response.limit,
    total: response.total,
  );
});

final classMembersPaginationProvider =
    FutureProvider.autoDispose.family<PaginationParams, int>(
  (ref, id) async {
    final repository = GetIt.I<ClassRepository>();

    final response = await repository.members(id, page: 1);

    ref.keepAlive();

    return PaginationParams(
      limit: response.limit,
      total: response.total,
    );
  },
);

class ClassMembersParams extends Equatable {
  final int id;
  final int page;

  const ClassMembersParams({
    required this.id,
    required this.page,
  });

  @override
  List<Object?> get props => [id, page];
}

final classMembersProvider =
    FutureProvider.autoDispose.family<PaginatedData<User>, ClassMembersParams>(
  (ref, params) async {
    final repository = GetIt.I<ClassRepository>();

    final response = await repository.members(params.id, page: params.page);

    ref.keepAlive();

    return response;
  },
);
