import 'package:classroom_mobile/modules/class/widgets/placeholder_list_tile.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class PlaceholderList extends StatelessWidget {
  const PlaceholderList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Shimmer.fromColors(
        baseColor: Colors.grey[300]!,
        highlightColor: Colors.grey[100]!,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: const [
              PlaceholderListTile(),
              PlaceholderListTile(),
              PlaceholderListTile(),
              PlaceholderListTile(),
              PlaceholderListTile(),
            ],
          ),
        ));
  }
}
