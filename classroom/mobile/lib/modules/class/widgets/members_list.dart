import 'package:classroom_mobile/modules/class/widgets/placeholder_list.dart';
import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:classroom_mobile/widgets/pull_to_refresh_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:classroom_mobile/providers/class_provider.dart';

class MembersList extends ConsumerWidget {
  final int classId;

  const MembersList({Key? key, required this.classId}) : super(key: key);

  Future<void> _onRefresh(WidgetRef ref) async {
    ref.invalidate(classMembersPaginationProvider(classId));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final provider = ref.watch(classMembersPaginationProvider(classId));

    return provider.when(
      data: (pagination) {
        return PullToRefreshList(
          onRefresh: () => _onRefresh(ref),
          itemCount: pagination.total,
          itemBuilder: (context, index) {
            final member = ref
                .watch(classMembersProvider(ClassMembersParams(
                    id: classId, page: index ~/ pagination.limit)))
                .whenData((value) => value.data[index % pagination.limit]);

            return member.when(
              loading: () => const PlaceholderListTile(),
              data: (member) => Card(
                child: ListTile(
                  title: Text(member.name),
                  subtitle: Text(member.email),
                ),
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
