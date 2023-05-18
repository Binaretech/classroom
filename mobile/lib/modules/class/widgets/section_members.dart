import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/mixins/infinite_scroll_pagination.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/widgets/user_avatar.dart';
import 'package:flutter/material.dart';

class SectionMembers extends StatefulWidget {
  // final ClassRepository _repository;
  final int sectionId;

  const SectionMembers({Key? key, required this.sectionId}) : super(key: key);

  @override
  SectionMembersState createState() => SectionMembersState();
}

class SectionMembersState extends State<SectionMembers>
    with InfiniteScrollPagination {
  bool isLoading = true;
  List<User> members = [];

  @override
  void fetchData() {
    // widget._repository.getSectionMembers(widget.sectionId, page).then((value) {
    //   setState(() {
    //     members.addAll(value.data);
    //     isLoading = false;
    //     pageCount = value.pages;
    //     page++;
    //   });
    // }).catchError((e) {
    //   setState(() {
    //     isLoading = false;
    //   });
    // });
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    if (isLoading) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }

    return ListView.builder(
      controller: controller,
      padding: const EdgeInsets.all(16),
      itemCount: members.length,
      itemBuilder: (context, index) {
        final member = members[index];

        return ListTile(
          title: Text(member.fullName),
          subtitle:
              Text(lang.trans("attributes.${member.name}", capitalize: true)),
          leading: UserAvatar(user: member),
        );
      },
    );
  }
}
