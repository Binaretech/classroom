import 'package:classroom_mobile/models/class.dart';
import 'package:classroom_mobile/modules/class/widgets/add_class_member_floating_action_button.dart';
import 'package:classroom_mobile/modules/class/widgets/create_section_floating_action_button.dart';
import 'package:classroom_mobile/modules/class/widgets/section_list.dart';
import 'package:classroom_mobile/providers/class_provider.dart';
import 'package:classroom_mobile/widgets/drawer/app_drawer.dart';
import 'package:flutter/material.dart';
import 'package:classroom_mobile/modules/class/widgets/class_bottom_navigation.dart';
import 'package:classroom_mobile/modules/class/widgets/members_list.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ClassViewArguments {
  final int classId;
  ClassViewArguments({required this.classId});
}

class ClassView extends ConsumerStatefulWidget {
  static const route = '/class';

  const ClassView({Key? key}) : super(key: key);

  @override
  ClassViewState createState() => ClassViewState();
}

class ClassViewState extends ConsumerState<ClassView> {
  int _currentIndex = 0;

  int _id() {
    final args =
        (ModalRoute.of(context)!.settings.arguments as ClassViewArguments);

    return args.classId;
  }

  Widget _views(int index) {
    final id = _id();

    return [
      SectionList(classId: id),
      MembersList(classId: id),
    ][index];
  }

  Widget? _floatingActionButtons(int index) {
    final id = _id();

    return [
      CreateSectionFloatingActionButton(classId: id),
      AddClassMemberFloatingActionButton(classId: id),
    ][index];
  }

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  Widget _body(Class clss) {
    return Scaffold(
      appBar: AppBar(
        title: Text(clss.name),
      ),
      drawer: const AppDrawer(),
      body: _views(_currentIndex),
      bottomNavigationBar: ClassBottomNavigation(
        currentIndex: _currentIndex,
        onTabTapped: _onTabTapped,
      ),
      floatingActionButton: _floatingActionButtons(_currentIndex),
    );
  }

  Widget _load() {
    return Scaffold(
      body: const Center(
        child: CircularProgressIndicator(),
      ),
      floatingActionButton: _floatingActionButtons(_currentIndex),
    );
  }

  @override
  Widget build(BuildContext context) {
    final id = _id();

    final clss = ref.watch(classProvider(id));
    return clss.when(
      loading: () => _load(),
      data: (clss) => _body(clss),
      error: (error, stack) => Text(error.toString()),
    );
  }
}
