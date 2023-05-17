import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/modules/section/section_view.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

enum MenuOption {
  edit,
  delete,
}

class SectionListItem extends ConsumerWidget {
  final Section section;
  final SectionRepository repository;

  SectionListItem({Key? key, required this.section})
      : repository = GetIt.I<SectionRepository>(),
        super(key: key);

  Future<void> _deleteSection(
      BuildContext context, int sectionId, WidgetRef ref) async {
    showLoadingDialog(context);

    try {
      await repository.delete(sectionId);

      ref.invalidate(sectionPaginationProvider);
      ref.invalidate(paginatedSectionProvider);
    } finally {
      Navigator.of(context).pop();
    }
  }

  Widget _itemMenu(BuildContext context, int sectionId, WidgetRef ref) {
    final lang = Lang.of(context);

    return PopupMenuButton(
        child: const Icon(Icons.more_vert),
        itemBuilder: (context) => [
              PopupMenuItem(
                value: MenuOption.edit,
                child: Text(lang.trans('messages.edit')),
              ),
              PopupMenuItem(
                value: MenuOption.delete,
                child: Text(lang.trans('messages.delete')),
              ),
            ],
        onSelected: (MenuOption value) {
          switch (value) {
            case MenuOption.delete:
              _deleteSection(context, section.id, ref);
              break;
            default:
              break;
          }
        });
  }

  void _onTapSection(BuildContext context, Section section) {
    Navigator.of(context).pushNamed(SectionView.route,
        arguments: SectionViewArguments(sectionId: section.id));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      child: ListTile(
        title: Text(section.name),
        trailing: _itemMenu(context, section.id, ref),
        onTap: () => _onTapSection(context, section),
      ),
    );
  }
}
