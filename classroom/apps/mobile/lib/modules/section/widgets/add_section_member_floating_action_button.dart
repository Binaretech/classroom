import 'package:classroom_mobile/modules/section/widgets/add_section_member_dialog.dart';
import 'package:flutter/material.dart';

class AddSectionMemberFloatingActionButton extends StatelessWidget {
  final int sectionId;

  const AddSectionMemberFloatingActionButton(
      {Key? key, required this.sectionId})
      : super(key: key);

  Future<void> showAddMemberDialog(BuildContext context) {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AddSectionMembersDialog(
          sectionId: sectionId,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        showAddMemberDialog(context);
      },
      child: const Icon(Icons.add),
    );
  }
}
