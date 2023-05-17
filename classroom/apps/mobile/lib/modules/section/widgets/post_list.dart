import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:classroom_mobile/modules/section/widgets/post_list_item.dart';
import 'package:classroom_mobile/providers/post_provider.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

class PostList extends ConsumerWidget {
  final Section section;

  const PostList({Key? key, required this.section}) : super(key: key);

  Future<void> _onRefresh(WidgetRef ref) async {
    ref.invalidate(postPaginationProvider);
    ref.invalidate(postsProvider);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    final postPagination = ref.watch(postPaginationProvider(section.id));

    return postPagination.when(
      loading: () => Shimmer.fromColors(
        baseColor: Colors.grey[300]!,
        highlightColor: Colors.grey[100]!,
        child: const PlaceholderList(),
      ),
      data: (pagination) {
        return PullToRefreshList(
          emptyMessage: lang.trans('messages.noPosts'),
          itemCount: pagination.total,
          itemBuilder: (context, index) {
            final post = ref
                .watch(postsProvider(PostParams(
                    sectionId: section.id, page: index ~/ pagination.limit)))
                .whenData((value) => value.data[index % pagination.limit]);

            return post.when(
              loading: () => const PlaceholderListTile(),
              data: (post) => PostListItem(post: post),
              error: (error, stack) => Text(error.toString()),
            );
          },
          onRefresh: () => _onRefresh(ref),
        );
      },
      error: (error, stackTrace) => Text(error.toString()),
    );
  }
}
