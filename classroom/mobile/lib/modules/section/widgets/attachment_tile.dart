import 'dart:io';

import 'package:flutter/material.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:path/path.dart';

class AttachmentTile extends StatelessWidget {
  final File file;
  final void Function() onRemove;

  const AttachmentTile({Key? key, required this.file, required this.onRemove})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: ClipRRect(
          borderRadius: BorderRadius.circular(8.0),
          child: isImage(file.path)
              ? Image.file(
                  file,
                  height: 48.0,
                  width: 48.0,
                  fit: BoxFit.cover,
                )
              : Icon(getIconForFile(file.path)),
        ),
        title: Text(basename(file.path)),
        subtitle: Text('${file.lengthSync()} bytes'),
        trailing: IconButton(
          icon: const Icon(Icons.delete),
          onPressed: onRemove,
        ),
      ),
    );
  }
}
