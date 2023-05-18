import 'package:flutter/material.dart';

mixin InfiniteScrollPagination<T extends StatefulWidget> on State<T> {
  final ScrollController controller = ScrollController();

  int page = 1;
  int pageCount = 1;

  void fetchData();

  Future<void> refresh() async {
    setState(() {
      page = 1;
    });

    return fetchData();
  }

  @override
  void initState() {
    super.initState();

    controller.addListener(() {
      if (controller.position.pixels == controller.position.maxScrollExtent &&
          page <= pageCount) {
        fetchData();
        setState(() {
          page++;
        });
      }
    });

    fetchData();
  }

  @override
  void dispose() {
    controller.dispose();

    super.dispose();
  }
}
