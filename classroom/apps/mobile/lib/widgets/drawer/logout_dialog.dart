import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/auth/login.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:classroom_mobile/utils/helpers.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

class LogoutDialog extends StatefulWidget {
  final AuthRepository _repository;

  LogoutDialog({Key? key})
      : _repository = GetIt.I<AuthRepository>(),
        super(key: key);

  @override
  LogoutDialogState createState() => LogoutDialogState();
}

class LogoutDialogState extends State<LogoutDialog> {
  Future<void> _logout() async {
    final navigator = Navigator.of(context);
    final bloc = context.read<AuthenticationBloc>();

    showLoadingDialog(context);

    try {
      await widget._repository.logout();

      navigator.pop();
      navigator.pop(true);

      navigator.pushNamed(Login.route);

      bloc.add(const UnauthenticateUser());
    } catch (e) {
      navigator.pop(true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);
    final theme = Theme.of(context);

    return AlertDialog(
      title: Text(lang.trans('messages.logout.title', capitalize: true)),
      content: Text(lang.trans('messages.logout.content', capitalize: true)),
      actions: [
        TextButton(
          onPressed: () async {
            await _logout();
          },
          child: Text(lang.trans('messages.accept', capitalize: true)),
        ),
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          style: ButtonStyle(
              foregroundColor:
                  MaterialStateProperty.all(theme.colorScheme.error)),
          child: Text(lang.trans('messages.cancel', capitalize: true)),
        ),
      ],
    );
  }
}
