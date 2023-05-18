import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/providers/user_provider.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserInfo extends ConsumerWidget {
  const UserInfo({Key? key}) : super(key: key);

  Widget avatar(User user) {
    final image = user.profileImage == null
        ? null
        : Image.network(user.profileImage!.url).image;

    return CircleAvatar(
      radius: 30.0,
      foregroundImage: image,
      child: Text(unnacent("${user.name[0]}${user.lastname[0]}")),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authUserProvider);

    return user.when(
      loading: () => Container(),
      data: (data) {
        if (data == null) return Container();
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            children: [
              avatar(data),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(data.fullName),
              ),
            ],
          ),
        );
      },
      error: (error, stack) => Container(),
    );
  }
}
