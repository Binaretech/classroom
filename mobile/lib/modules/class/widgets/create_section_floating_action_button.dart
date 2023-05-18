import 'package:classroom_mobile/modules/class/widgets/create_section_dialog.dart';
import 'package:flutter/material.dart';

class CreateSectionFloatingActionButton extends StatelessWidget {
  final int classId;

  const CreateSectionFloatingActionButton({Key? key, required this.classId})
      : super(key: key);

  Future<void> _createSection(BuildContext context) async {
    showDialog<String>(
      context: context,
      builder: (context) {
        return CreateSectionDialog(classId: classId);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        _createSection(context);
      },
      child: const Icon(Icons.add),
    );
  }
}
