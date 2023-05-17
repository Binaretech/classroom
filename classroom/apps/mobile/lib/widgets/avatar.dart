import 'package:flutter/material.dart';

class Avatar extends StatelessWidget {
  final double radius;
  final double? iconSize;
  final void Function()? onTap;
  final IconData icon;
  final Image? image;

  const Avatar({
    Key? key,
    this.radius = 40,
    this.iconSize,
    this.icon = Icons.person,
    this.onTap,
    this.image,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GestureDetector(
      onTap: onTap,
      child: CircleAvatar(
        backgroundColor: theme.highlightColor,
        foregroundImage: image?.image,
        radius: radius,
        child: image == null
            ? Icon(
                Icons.camera_alt,
                color: theme.disabledColor,
                size: iconSize,
              )
            : null,
      ),
    );
  }
}
