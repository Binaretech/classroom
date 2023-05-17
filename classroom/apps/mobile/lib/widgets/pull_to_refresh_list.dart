import 'package:flutter/material.dart';

class PullToRefreshList extends StatefulWidget {
  final String emptyMessage;
  final int itemCount;
  final Widget Function(BuildContext, int) itemBuilder;
  final ScrollController? controller;
  final Future<void> Function() onRefresh;

  const PullToRefreshList({
    Key? key,
    required this.emptyMessage,
    required this.itemCount,
    required this.itemBuilder,
    required this.onRefresh,
    this.controller,
  }) : super(key: key);

  @override
  PullToRefreshListState createState() => PullToRefreshListState();
}

class PullToRefreshListState extends State<PullToRefreshList> {
  bool _isRefreshing = false;

  Widget _empty() {
    return LayoutBuilder(
      builder: (context, constraints) {
        return SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: SizedBox(
            height: constraints.maxHeight,
            child: Center(
              child: Text(widget.emptyMessage),
            ),
          ),
        );
      },
    );
  }

  Widget _list() {
    return ListView.builder(
      controller: widget.controller,
      padding: const EdgeInsets.all(16),
      itemCount: widget.itemCount,
      itemBuilder: widget.itemBuilder,
    );
  }

  Future<void> _onRefresh() async {
    if (_isRefreshing) {
      return;
    }

    setState(() {
      _isRefreshing = true;
    });

    try {
      await widget.onRefresh();
    } finally {
      setState(() {
        _isRefreshing = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _onRefresh,
      child: widget.itemCount == 0 && !_isRefreshing ? _empty() : _list(),
    );
  }
}
