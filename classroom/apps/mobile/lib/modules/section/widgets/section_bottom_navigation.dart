import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter/material.dart';

class SectionBottomNavigation extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTabTapped;

  const SectionBottomNavigation({
    Key? key,
    required this.currentIndex,
    required this.onTabTapped,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTabTapped,
      items: [
        BottomNavigationBarItem(
          icon: const Icon(Icons.class_rounded),
          label: lang.choice('attributes.post', 2, capitalize: true),
        ),
        BottomNavigationBarItem(
          icon: const Icon(Icons.people),
          label: lang.trans('attributes.members', capitalize: true),
        ),
      ],
    );
  }
}
