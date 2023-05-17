import 'package:classroom_mobile/modules/class/widgets/add_class_member_dialog.dart';
import 'package:flutter/material.dart';

class AddClassMemberFloatingActionButton extends StatelessWidget {
  final int classId;

  const AddClassMemberFloatingActionButton({Key? key, required this.classId})
      : super(key: key);

  Future<void> _addMember(BuildContext context) async {
    showDialog<String>(
      context: context,
      builder: (context) {
        return AddClassMemberDialog(classId: classId);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        _addMember(context);
      },
      child: const Icon(Icons.add),
    );
  }
}
