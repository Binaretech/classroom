import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter/material.dart';

class TeacherBadge extends StatelessWidget {
  final Widget child;
  const TeacherBadge({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Stack(
      children: [
        child,
        Positioned(
          bottom: 0,
          right: 0,
          child: Container(
            padding: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.tertiary,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              lang.trans('messages.badges.teacher'),
              style: const TextStyle(
                color: Colors.white,
                fontSize: 9,
              ),
            ),
          ),
        )
      ],
    );
  }
}
