import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/modules/section/widgets/add_section_member_floating_action_button.dart';
import 'package:classroom_mobile/modules/section/widgets/add_post_floating_action_button.dart';
import 'package:classroom_mobile/providers/section_provider.dart';
import 'package:classroom_mobile/widgets/drawer/app_drawer.dart';
import 'package:flutter/material.dart';
import 'package:classroom_mobile/modules/section/widgets/section_bottom_navigation.dart';
import 'package:classroom_mobile/modules/section/widgets/post_list.dart';
import 'package:classroom_mobile/modules/section/widgets/members_list.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SectionViewArguments {
  final int sectionId;
  SectionViewArguments({required this.sectionId});
}

class SectionView extends ConsumerStatefulWidget {
  static const route = '/section';

  const SectionView({Key? key}) : super(key: key);

  @override
  SectionViewState createState() => SectionViewState();
}

class SectionViewState extends ConsumerState<SectionView> {
  int _currentIndex = 0;

  int _id() {
    final args =
        (ModalRoute.of(context)!.settings.arguments as SectionViewArguments);

    return args.sectionId;
  }

  Widget _views(int index, Section section) {
    return [
      PostList(section: section),
      MembersList(sectionId: section.id),
    ][index];
  }

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  Widget? _floatingActionButton() {
    return [
      AddPostFloatingActionButton(
        sectionId: _id(),
      ),
      AddSectionMemberFloatingActionButton(
        sectionId: _id(),
      ),
    ][_currentIndex];
  }

  Widget _load() {
    return const Scaffold(
      drawer: AppDrawer(),
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }

  Widget _body(Section section) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${section.clss!.name} (${section.name})"),
      ),
      drawer: const AppDrawer(),
      body: _views(_currentIndex, section),
      floatingActionButton: _floatingActionButton(),
      bottomNavigationBar: SectionBottomNavigation(
        currentIndex: _currentIndex,
        onTabTapped: _onTabTapped,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final id = _id();

    final section = ref.watch(sectionProvider(id));

    return section.when(
      loading: _load,
      data: (section) => _body(section),
      // show the stack
      error: (error, stack) => Scaffold(
        body: Center(
          child: Text(error.toString()),
        ),
      ),
    );
  }
}
