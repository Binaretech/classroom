import 'package:classroom_mobile/models/paginated_data.dart';
import 'package:classroom_mobile/models/pagination_params.dart';
import 'package:classroom_mobile/models/post.dart';
import 'package:classroom_mobile/repository/post_repository.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class PostParams extends Equatable {
  final int sectionId;
  final int page;

  const PostParams({
    required this.sectionId,
    required this.page,
  });

  @override
  List<Object?> get props => [sectionId, page];
}

final postPaginationProvider = FutureProvider.autoDispose
    .family<PaginationParams, int>((ref, sectionId) async {
  final repository = GetIt.I<PostRepository>();

  final response = await repository.get(sectionId, page: 1);

  ref.keepAlive();

  return PaginationParams(
    limit: response.limit,
    total: response.total,
  );
});

final postsProvider = FutureProvider.autoDispose
    .family<PaginatedData<Post>, PostParams>((ref, params) async {
  final repository = GetIt.I<PostRepository>();

  final response = await repository.get(params.sectionId, page: params.page);

  ref.keepAlive();

  return response;
});
