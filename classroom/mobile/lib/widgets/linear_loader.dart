import 'package:flutter/material.dart';

class LinearLoader extends StatelessWidget {
  final Widget child;
  final bool isLoading;

  const LinearLoader({
    Key? key,
    required this.child,
    required this.isLoading,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (isLoading) const LinearProgressIndicator(),
        child,
      ],
    );
  }
}
