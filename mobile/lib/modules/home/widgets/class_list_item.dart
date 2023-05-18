import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/class.dart';
import 'package:classroom_mobile/modules/class/class_view.dart';
import 'package:classroom_mobile/providers/class_provider.dart';
import 'package:classroom_mobile/repository/class_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

enum MenuOption {
  edit,
  archive,
}

class ClassListItem extends ConsumerWidget {
  final Class clss;
  final ClassRepository _repository;

  ClassListItem({Key? key, required this.clss})
      : _repository = GetIt.I<ClassRepository>(),
        super(key: key);

  void Function() _onTap(BuildContext context, Class clss) {
    return () {
      Navigator.of(context).pushNamed(
        '/class',
        arguments: ClassViewArguments(classId: clss.id),
      );
    };
  }

  Widget _itemMenu(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    return PopupMenuButton(
        child: const Icon(Icons.more_vert),
        itemBuilder: (context) => [
              PopupMenuItem(
                value: MenuOption.edit,
                child: Text(lang.trans('messages.edit')),
              ),
              PopupMenuItem(
                value: MenuOption.archive,
                child: Text(lang.trans('messages.archive')),
              ),
            ],
        onSelected: (MenuOption value) {
          switch (value) {
            case MenuOption.archive:
              _archive(context, ref);
              break;
            default:
              break;
          }
        });
  }

  void _archive(BuildContext context, WidgetRef ref) async {
    final navigator = Navigator.of(context);

    showLoadingDialog(context);

    try {
      await _repository.archive(clss.id);

      ref.invalidate(paginatedClassProvider);
      ref.invalidate(classProvider(clss.id));

      navigator.pop();
    } catch (e) {
      navigator.pop();
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final lang = Lang.of(context);

    return Card(
      child: ListTile(
        title: Text(clss.name),
        subtitle: Text(
          lang.trans(
            clss.isTeacher ? 'attributes.teacher' : 'attributes.student',
            capitalize: true,
          ),
        ),
        trailing: _itemMenu(context, ref),
        onTap: _onTap(context, clss),
      ),
    );
  }
}
