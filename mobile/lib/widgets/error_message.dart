import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter/material.dart';

class ErrorMessage extends StatelessWidget {
  final String message;
  final void Function()? onRetry;

  const ErrorMessage({Key? key, this.message = '', this.onRetry})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(message),
          if (onRetry != null)
            ElevatedButton(
              onPressed: onRetry,
              child: Text(lang.trans('messages.retry')),
            ),
        ],
      ),
    );
  }
}
