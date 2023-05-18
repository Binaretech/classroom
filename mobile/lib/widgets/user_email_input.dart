import 'dart:async';

import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get_it/get_it.dart';

class UserEmailInput extends ConsumerStatefulWidget {
  final void Function(String?)? onSaved;

  const UserEmailInput({Key? key, this.onSaved}) : super(key: key);

  @override
  UserEmailInputState createState() => UserEmailInputState();
}

class UserEmailInputState extends ConsumerState<UserEmailInput> {
  final TextEditingController _controller = TextEditingController();
  final UserRepository _userRepository = GetIt.I<UserRepository>();

  bool isLoading = false;

  @override
  void dispose() {
    _controller.dispose();
    _userRepository.close();

    super.dispose();
  }

  FutureOr<Iterable<User>> _optionsBuilder(
      TextEditingValue textEditingValue) async {
    if (textEditingValue.text == '') {
      return const Iterable<User>.empty();
    }

    try {
      await Future.delayed(const Duration(milliseconds: 500));

      final response = await _userRepository.searchByEmail(
        search: textEditingValue.text,
      );

      return response;
    } catch (e) {
      return const Iterable<User>.empty();
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Autocomplete<User>(
      fieldViewBuilder:
          (context, textEditingController, focusNode, onFieldSubmitted) {
        return TextInput(
          controller: textEditingController,
          focusNode: focusNode,
          onSaved: widget.onSaved,
          keyboardType: TextInputType.emailAddress,
          label: lang.trans('attributes.email', capitalize: true),
        );
      },
      optionsViewBuilder: (context, onSelected, options) {
        return Align(
          alignment: Alignment.topLeft,
          child: Material(
            elevation: 4.0,
            child: SizedBox(
              height: 200.0,
              width: 250.0,
              child: ListView.builder(
                padding: const EdgeInsets.all(8.0),
                itemCount: options.length,
                itemBuilder: (context, index) {
                  final option = options.elementAt(index);

                  return ListTile(
                    title: Text(option.email),
                    subtitle: Text(option.fullName),
                    onTap: () {
                      onSelected(option);
                    },
                  );
                },
              ),
            ),
          ),
        );
      },
      displayStringForOption: (option) => option.email,
      optionsBuilder: _optionsBuilder,
    );
  }
}
