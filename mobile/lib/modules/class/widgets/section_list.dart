import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:classroom_mobile/modules/class/widgets/section_list_item.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

class SectionList extends ConsumerWidget {
  final int classId;

  const SectionList({Key? key, required this.classId}) : super(key: key);

  Future<void> _onRefresh(WidgetRef ref) async {
    ref.invalidate(sectionPaginationProvider);
    ref.invalidate(paginatedSectionProvider);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    final sectionPagination = ref.watch(sectionPaginationProvider(classId));

    return sectionPagination.when(
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
                  .watch(paginatedSectionProvider(SectionsParams(
                      classId: classId, page: index ~/ pagination.limit)))
                  .whenData((value) => value.data[index % pagination.limit]);

              return clss.when(
                loading: () => const PlaceholderListTile(),
                data: (section) => SectionListItem(section: section),
                error: (error, stack) => Text(error.toString()),
              );
            },
            onRefresh: () => _onRefresh(ref),
          );
        },
        error: (error, stack) => Text(error.toString()));
  }
}
