import 'package:classroom_mobile/modules/section/widgets/add_post_dialog.dart';
import 'package:flutter/material.dart';

class AddPostFloatingActionButton extends StatelessWidget {
  final int sectionId;
  const AddPostFloatingActionButton({Key? key, required this.sectionId})
      : super(key: key);

  Future<void> _showAddMemberDialog(BuildContext context) {
    return showGeneralDialog(
        context: context,
        barrierDismissible: true,
        barrierLabel:
            MaterialLocalizations.of(context).modalBarrierDismissLabel,
        barrierColor: Colors.black45,
        transitionDuration: const Duration(milliseconds: 200),
        pageBuilder: (BuildContext buildContext, Animation animation,
            Animation secondaryAnimation) {
          return AddPostDialog(sectionId: sectionId);
        });
  }

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      onPressed: () {
        _showAddMemberDialog(context);
      },
      child: const Icon(Icons.add),
    );
  }
}
