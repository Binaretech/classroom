import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:classroom_mobile/modules/home/widgets/class_list_item.dart';
import 'package:classroom_mobile/providers/class_provider.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

class ClassesList extends ConsumerWidget {
  const ClassesList({Key? key}) : super(key: key);

  Future<void> _onRefresh(WidgetRef ref) async {
    ref.invalidate(classPaginationProvider);
    ref.invalidate(paginatedClassProvider);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    final classPagination = ref.watch(classPaginationProvider);

    return classPagination.when(
        loading: () => Shimmer.fromColors(
              baseColor: Colors.grey[300]!,
              highlightColor: Colors.grey[100]!,
              child: const PlaceholderList(),
            ),
        data: (pagination) {
          return PullToRefreshList(
            emptyMessage: lang.trans('messages.noClasses'),
            itemCount: pagination.total,
            itemBuilder: (context, index) {
              final clss = ref
                  .watch(paginatedClassProvider(index ~/ pagination.limit))
                  .whenData((value) => value.data[index % pagination.limit]);

              return clss.when(
                loading: () => const PlaceholderListTile(),
                data: (clss) => ClassListItem(clss: clss),
                error: (error, stack) => Text(error.toString()),
              );
            },
            onRefresh: () => _onRefresh(ref),
          );
        },
        error: (error, stack) => Text(error.toString()));
  }
}
