import 'package:classroom_mobile/modules/class/widgets/placeholder_list.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:classroom_mobile/modules/section/widgets/member_list_item.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MembersList extends ConsumerWidget {
  final int sectionId;

  const MembersList({Key? key, required this.sectionId}) : super(key: key);

  Future<void> _onRefresh(WidgetRef ref) async {
    ref.invalidate(sectionMembersPaginationProvider(sectionId));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = ref.watch(sectionMembersPaginationProvider(sectionId));

    return provider.when(
      data: (pagination) {
        return PullToRefreshList(
          onRefresh: () => _onRefresh(ref),
          itemCount: pagination.total,
          itemBuilder: (context, index) {
            final member = ref
                .watch(sectionMembersProvider(SectionMembersParams(
                    id: sectionId, page: index ~/ pagination.limit)))
                .whenData((value) => value.data[index % pagination.limit]);

            return member.when(
              loading: () => const PlaceholderListTile(),
              data: (member) => MemberListItem(
                user: member,
                sectionId: sectionId,
              ),
              error: (error, stack) => Text(error.toString()),
            );
          },
          emptyMessage: 'No members',
        );
      },
      loading: () => const PlaceholderList(),
      error: (error, stack) => Text(error.toString()),
    );
  }
}
