import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/widgets/drawer/logout_dialog.dart';
import 'package:flutter/material.dart';

class LogoutButton extends StatelessWidget {
  const LogoutButton({Key? key}) : super(key: key);

  Future<bool?> showLogoutDialog(BuildContext context) async {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return LogoutDialog();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final lang = Lang.of(context);

    return TextButton.icon(
      onPressed: () async {
        await showLogoutDialog(context);
      },
      style: ButtonStyle(
        iconColor: MaterialStateProperty.all(theme.colorScheme.error),
        foregroundColor: MaterialStateProperty.all(theme.colorScheme.error),
      ),
      icon: const Icon(Icons.logout),
      label: Text(lang.trans('attributes.logout', capitalize: true)),
    );
  }
}
