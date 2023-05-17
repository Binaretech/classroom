import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/home/widgets/class_list.dart';
import 'package:classroom_mobile/modules/home/widgets/register_user_info.dart';
import 'package:classroom_mobile/providers/class_provider.dart';
import 'package:classroom_mobile/repository/class_repository.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:classroom_mobile/widgets/classroom_app_bar.dart';
import 'package:classroom_mobile/widgets/drawer/app_drawer.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

part 'widgets/create_class_dialog.dart';

class Home extends StatefulWidget {
  static const route = '/';

  const Home({Key? key}) : super(key: key);

  @override
  HomeState createState() => HomeState();
}

class HomeState extends State<Home> {
  final repository = GetIt.I<UserRepository>();

  @override
  void initState() {
    super.initState();

    _loadUser();
  }

  void _loadUser() async {
    try {
      final user = await repository.info();
      if (user != null) {
        return;
      }

      _showCreateUserDialog();
    } finally {}
  }

  void _showCreateUserDialog() {
    showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return RegisterUserInfo();
        });
  }

  void _createClass(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return WillPopScope(
          child: _CreateClassDialog(),
          onWillPop: () async => false,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const ClassroomAppBar(),
      drawer: const AppDrawer(),
      body: const ClassesList(),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _createClass(context),
        child: const Icon(Icons.add),
      ),
    );
  }
}
