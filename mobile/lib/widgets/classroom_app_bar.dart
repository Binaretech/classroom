import 'package:classroom_mobile/providers/user_provider.dart';
import 'package:classroom_mobile/widgets/user_avatar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ClassroomAppBar extends ConsumerWidget implements PreferredSizeWidget {
  final String? title;

  const ClassroomAppBar({Key? key, this.title}) : super(key: key);

  @override
  Size get preferredSize => AppBar().preferredSize;

  Widget userInfo(WidgetRef ref) {
    final user = ref.watch(authUserProvider);

    return user.when(
      loading: () => Container(),
      data: (data) {
        if (data == null) return Container();
        return Padding(
          padding: const EdgeInsets.all(6.0),
          child: UserAvatar(user: data),
        );
      },
      error: (error, stack) => Container(),
    );
  }

  @override
  AppBar build(BuildContext context, WidgetRef ref) {
    return AppBar(
      title: title != null ? Text(title!) : null,
      actions: [
        userInfo(ref),
      ],
    );
  }
}
