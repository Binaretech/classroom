import 'dart:convert';

import 'package:classroom_mobile/models/post.dart';
import 'package:classroom_mobile/widgets/user_avatar.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_quill/flutter_quill.dart'
    show QuillController, QuillEditor, Document, Delta;

class PostListItem extends StatelessWidget {
  final Post post;
  late final QuillController controller;

  PostListItem({Key? key, required this.post}) : super(key: key) {
    final delta = Delta.fromJson(jsonDecode(post.content))..insert('\n');
    controller = QuillController(
      document: Document.fromDelta(delta),
      selection: const TextSelection.collapsed(offset: 0),
    );
  }

  Widget _userInformation() {
    if (post.user != null) {
      return Row(
        children: [
          UserAvatar(
            user: post.user!,
            radius: 20.0,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12.0),
            child: Text(
              post.user!.name,
              style: const TextStyle(
                fontSize: 12,
                color: Colors.grey,
              ),
            ),
          )
        ],
      );
    }

    return Container();
  }

  @override
  Widget build(BuildContext context) {
    final date = DateFormat.yMMMd().add_jm().format(post.createdAt);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            _userInformation(),
            const SizedBox(height: 10),
            Text(post.content),
            const SizedBox(height: 10),
            Align(
              alignment: Alignment.centerRight,
              child: Text(
                date,
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
