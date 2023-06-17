import 'package:classroom_mobile/modules/home/widgets/recent_posts.dart';
import 'package:classroom_mobile/modules/home/widgets/register_user_info.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:classroom_mobile/widgets/classroom_app_bar.dart';
import 'package:classroom_mobile/widgets/drawer/app_drawer.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

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

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: ClassroomAppBar(),
      drawer: AppDrawer(),
      body: Center(
        child: RecentPosts(),
      ),
    );
  }
}
