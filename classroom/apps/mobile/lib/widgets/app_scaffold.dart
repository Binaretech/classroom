import 'package:classroom_mobile/widgets/drawer/app_drawer.dart';
import 'package:flutter/material.dart';

class AppScaffold extends StatelessWidget {
  final Widget? body;

  const AppScaffold({Key? key, this.body}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      drawer: const AppDrawer(),
      body: body,
    );
  }
}
