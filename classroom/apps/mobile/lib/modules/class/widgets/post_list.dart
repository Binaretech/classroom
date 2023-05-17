import 'package:classroom_mobile/mixins/infinite_scroll_pagination.dart';
import 'package:classroom_mobile/models/post.dart';
import 'package:classroom_mobile/models/section.dart';
import 'package:classroom_mobile/repository/post_repository.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';
import 'package:intl/intl.dart';

class PostList extends StatefulWidget {
  final Section section;
  final PostRepository _repository;

  PostList({Key? key, required this.section})
      : _repository = GetIt.I<PostRepository>(),
        super(key: key);

  @override
  PostListState createState() => PostListState();
}

class PostListState extends State<PostList> with InfiniteScrollPagination {
  final List<Post> _posts = [];
  bool isLoading = false;

  @override
  void dispose() {
    widget._repository.close();
    super.dispose();
  }

  @override
  Future<void> fetchData() async {
    setState(() {
      isLoading = true;
    });

    try {
      await widget._repository.get(widget.section.id, page: page);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: controller,
      shrinkWrap: true,
      itemCount: _posts.length,
      itemBuilder: (context, index) {
        final post = _posts[index];

        final date = DateFormat.yMMMd().add_jm().format(post.createdAt);

        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Padding(
            padding: Theme.of(context).listTileTheme.contentPadding ??
                const EdgeInsets.all(16.0),
            child: Column(
              children: [
                ListTile(
                  contentPadding: const EdgeInsets.all(0.0),
                  leading: post.avatarByType(20.0),
                  title: Text(post.titleByType),
                  subtitle: Text(date),
                  trailing: const Icon(Icons.more_vert_sharp),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
