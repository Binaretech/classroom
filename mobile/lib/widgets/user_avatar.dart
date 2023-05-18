import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';

class UserAvatar extends StatelessWidget {
  final User user;
  final double radius;

  const UserAvatar({
    Key? key,
    this.radius = 30.0,
    required this.user,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final image = user.profileImage == null
        ? null
        : Image.network(user.profileImage!.url).image;

    return CircleAvatar(
      radius: radius,
      foregroundImage: image,
      child: Text(unnacent("${user.name[0]}${user.lastname[0]}")),
    );
  }
}
