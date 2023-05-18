import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter/material.dart';

class HomePopupMenu extends StatelessWidget {
  const HomePopupMenu({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return PopupMenuButton(
      onSelected: (value) {
        if (value == 'archive') {
          Navigator.pushNamed(context, '/archive');
        }
      },
      itemBuilder: (context) => [
        PopupMenuItem(
          value: 'archive',
          child: Row(
            children: [
              Padding(
                padding: const EdgeInsets.only(right: 16.0),
                child: Icon(
                  Icons.archive,
                  color: Theme.of(context).textTheme.headlineLarge!.color,
                ),
              ),
              Text(lang.trans(
                'attributes.archived',
                capitalize: true,
              )),
            ],
          ),
        ),
      ],
    );
  }
}
