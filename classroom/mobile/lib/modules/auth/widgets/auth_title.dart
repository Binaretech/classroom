import 'package:flutter/material.dart';

class AuthTitle extends StatelessWidget {
  final String title;
  const AuthTitle({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 50),
      child: SizedBox(
        width: double.infinity,
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 36,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
