import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:classroom_mobile/widgets/dropdown.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class CreateSectionData {
  String name = '';
}

class AddClassMemberDialog extends StatefulWidget {
  final int classId;
  final SectionRepository _repository;

  AddClassMemberDialog({Key? key, required this.classId})
      : _repository = GetIt.I.get<SectionRepository>(),
        super(key: key);

  @override
  State createState() => AddClassMemberDialogState();
}

class AddClassMemberDialogState extends State<AddClassMemberDialog> {
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

      // bloc.add(AddClassSectionEvent(widget.classId, section));

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
        content: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0),
              child: TextInput(
                label: lang.trans('attributes.name', capitalize: true),
                validation: const [requiredRule],
                onSaved: (value) {
                  _data.name = value!;
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0),
              child: Dropdown(
                label: lang.trans('attributes.section', capitalize: true),
                list: const [],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
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
