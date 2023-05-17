import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class CreateSectionData {
  String name = '';
}

class CreateSectionDialog extends ConsumerStatefulWidget {
  final int classId;
  final SectionRepository _repository;

  CreateSectionDialog({Key? key, required this.classId})
      : _repository = GetIt.I.get<SectionRepository>(),
        super(key: key);

  @override
  CreateSectionDialogState createState() => CreateSectionDialogState();
}

class CreateSectionDialogState extends ConsumerState<CreateSectionDialog> {
  final _formKey = GlobalKey<FormState>();
  final _data = CreateSectionData();

  Future<void> _createSection() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final navigator = Navigator.of(context);

    _formKey.currentState!.save();

    showLoadingDialog(context);

    try {
      await widget._repository
          .create(name: _data.name, classId: widget.classId);

      ref.invalidate(sectionPaginationProvider);
      ref.invalidate(paginatedSectionProvider);

      navigator.pop();
      navigator.pop();
    } catch (_) {
      navigator.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Form(
      key: _formKey,
      child: AlertDialog(
        title: Text(lang.trans('messages.createSection')),
        content: TextInput(
          label: lang.trans('attributes.name', capitalize: true),
          validation: const [requiredRule],
          onSaved: (value) {
            _data.name = value!;
          },
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            style: TextButton.styleFrom(
              foregroundColor: Theme.of(context).colorScheme.error,
            ),
            child: Text(lang.trans('messages.cancel', capitalize: true)),
          ),
          TextButton(
            onPressed: () => _createSection(),
            child: Text(lang.trans('messages.accept', capitalize: true)),
          ),
        ],
      ),
    );
  }
}
