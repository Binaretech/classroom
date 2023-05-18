import 'dart:io';

import 'package:classroom_mobile/modules/section/widgets/attachment_tile.dart';
import 'package:classroom_mobile/repository/post_repository.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class PostData {
  String? content;
}

class AddPostDialog extends ConsumerStatefulWidget {
  final int sectionId;

  const AddPostDialog({Key? key, required this.sectionId}) : super(key: key);

  @override
  AddPostDialogState createState() => AddPostDialogState();
}

class AddPostDialogState extends ConsumerState<AddPostDialog> {
  final repository = GetIt.I<PostRepository>();
  final _formKey = GlobalKey<FormState>();
  final data = PostData();

  final List<File> _attachments = [];

  Future<void> _onSave(BuildContext context) async {
    final navigator = Navigator.of(context);

    await repository.create(widget.sectionId, '', _attachments);

    navigator.pop();
  }

  void _onAddAttachment() async {
    final file = await FilePicker.platform.pickFiles();
    if (file != null) {
      setState(() {
        _attachments.add(File(file.files.single.path!));
      });
    }
  }

  void _onRemoveAttachment(int index) {
    setState(() {
      _attachments.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => Navigator.pop(context),
                    ),
                    const Spacer(),
                    TextButton(
                      onPressed: () => _onSave(context),
                      child:
                          Text(lang.trans('messages.post', capitalize: true)),
                    ),
                  ],
                ),
                Expanded(
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                      child: Column(
                        children: [
                          TextFormField(
                            maxLines: null,
                            decoration: InputDecoration(
                              labelText: lang.trans(
                                  'views.add_post.postContent',
                                  capitalize: true),
                              prefixIcon: const Icon(Icons.format_align_left),
                              border: const OutlineInputBorder(),
                            ),
                            validator: rules([requiredRule]),
                            onSaved: (value) {
                              data.content = value;
                            },
                          ),
                          const SizedBox(height: 16.0),
                          Row(
                            children: [
                              IconButton(
                                icon: const Icon(Icons.attach_file),
                                onPressed: _onAddAttachment,
                              ),
                              const SizedBox(width: 8.0),
                              Text(lang.trans('views.add_post.attachFile',
                                  capitalize: true)),
                            ],
                          ),
                          const SizedBox(height: 16.0),
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: _attachments.length,
                            itemBuilder: (context, index) {
                              final file = _attachments[index];
                              return AttachmentTile(
                                file: file,
                                onRemove: () => _onRemoveAttachment(index),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
