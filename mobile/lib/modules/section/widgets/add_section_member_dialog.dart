import 'dart:async';

import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/widgets/user_email_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class Data {
  String email = '';
  String type = '';
}

class AddSectionMembersDialog extends ConsumerStatefulWidget {
  final int sectionId;

  const AddSectionMembersDialog({Key? key, required this.sectionId})
      : super(key: key);

  @override
  AddSectionMembersDialogState createState() => AddSectionMembersDialogState();
}

class AddSectionMembersDialogState
    extends ConsumerState<AddSectionMembersDialog> {
  final SectionRepository _sectionRepository = GetIt.I<SectionRepository>();
  final _form = GlobalKey<FormState>();

  final _data = Data();

  Future<void> _addMember() async {
    final navigator = Navigator.of(context);

    if (!_form.currentState!.validate()) {
      return;
    }

    _form.currentState!.save();

    await _sectionRepository.addMember(widget.sectionId, _data.email);

    ref.invalidate(sectionMembersPaginationProvider(widget.sectionId));
    ref.invalidate(sectionMembersProvider);

    navigator.pop();
  }

  @override
  void dispose() {
    _sectionRepository.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return AlertDialog(
      title: Text(lang.trans('views.add_section_member.title')),
      content: SizedBox(
        width: 400,
        child: SingleChildScrollView(
          child: Form(
            key: _form,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: UserEmailInput(
                    onSaved: (value) {
                      _data.email = value ?? '';
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text(lang.trans('messages.cancel', capitalize: true)),
        ),
        TextButton(
          onPressed: _addMember,
          child: Text(lang.trans('messages.accept', capitalize: true)),
        ),
      ],
    );
  }
}
