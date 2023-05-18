import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class PlaceholderListTile extends StatelessWidget {
  const PlaceholderListTile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Shimmer.fromColors(
        baseColor: Colors.grey[300]!,
        highlightColor: Colors.grey[100]!,
        child: const Card(
          child: ListTile(),
        ),
      ),
    );
  }
}
