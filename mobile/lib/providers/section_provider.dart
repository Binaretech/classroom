import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/pagination_params.dart';
import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class SectionsParams extends Equatable {
  final int classId;
  final int page;

  const SectionsParams({
    required this.classId,
    required this.page,
  });

  @override
  List<Object?> get props => [classId, page];
}

final sectionPaginationProvider = FutureProvider.autoDispose
    .family<PaginationParams, int>((ref, classId) async {
  final repository = GetIt.I<SectionRepository>();

  final response = await repository.get(classId, page: 1);

  ref.keepAlive();

  return PaginationParams(
    limit: response.limit,
    total: response.total,
  );
});

final paginatedSectionProvider = FutureProvider.autoDispose
    .family<PaginatedData<Section>, SectionsParams>((ref, params) async {
  final repository = GetIt.I<SectionRepository>();

  final response = await repository.get(params.classId, page: params.page);

  ref.keepAlive();

  return response;
});

final sectionProvider =
    FutureProvider.autoDispose.family<Section, int>((ref, id) async {
  final repository = GetIt.I<SectionRepository>();

  final response = await repository.show(id);

  return response;
});

final sectionMembersPaginationProvider =
    FutureProvider.autoDispose.family<PaginationParams, int>(
  (ref, id) async {
    final repository = GetIt.I<SectionRepository>();

    final response = await repository.members(id, page: 1);

    ref.keepAlive();

    return PaginationParams(
      limit: response.limit,
      total: response.total,
    );
  },
);

class SectionMembersParams extends Equatable {
  final int id;
  final int page;

  const SectionMembersParams({
    required this.id,
    required this.page,
  });

  @override
  List<Object?> get props => [id, page];
}

final sectionMembersProvider = FutureProvider.autoDispose
    .family<PaginatedData<User>, SectionMembersParams>(
  (ref, params) async {
    final repository = GetIt.I<SectionRepository>();

    final response = await repository.members(params.id, page: params.page);

    ref.keepAlive();

    return response;
  },
);
