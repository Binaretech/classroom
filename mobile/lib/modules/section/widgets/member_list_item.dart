import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

enum MenuOption {
  delete,
}

class MemberListItem extends ConsumerWidget {
  final User user;
  final int sectionId;
  final SectionRepository repository;

  MemberListItem({Key? key, required this.user, required this.sectionId})
      : repository = GetIt.I<SectionRepository>(),
        super(key: key);

  Future<void> _showRemoveConfirmDialog(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(lang.trans('views.remove_member.title')),
          content: Text(lang.trans('views.remove_member.description')),
          actions: <Widget>[
            TextButton(
              child: Text(
                lang.trans('messages.cancel', capitalize: true),
                style: TextStyle(
                  color: Theme.of(context).colorScheme.error,
                ),
              ),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text(
                lang.trans('messages.accept', capitalize: true),
              ),
              onPressed: () {
                _removeMember(context, ref);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _removeMember(BuildContext context, WidgetRef ref) async {
    showLoadingDialog(context);

    try {
      await repository.removeMember(sectionId, user.id);

      ref.invalidate(sectionMembersPaginationProvider);
      ref.invalidate(sectionMembersProvider);
    } finally {
      Navigator.of(context).pop();
    }
  }

  Widget _itemMenu(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    return PopupMenuButton(
        child: const Icon(Icons.more_vert),
        itemBuilder: (context) => [
              PopupMenuItem(
                value: MenuOption.delete,
                child: Text(lang.trans('messages.delete')),
              ),
            ],
        onSelected: (MenuOption value) {
          switch (value) {
            case MenuOption.delete:
              _showRemoveConfirmDialog(context, ref);
              break;
            default:
              break;
          }
        });
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      child: ListTile(
        title: Text(user.name),
        subtitle: Text(user.email),
        trailing: _itemMenu(context, ref),
      ),
    );
  }
}
