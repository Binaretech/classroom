import 'package:classroom_mobile/globals.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/utils/helpers.dart';

typedef Rule = String? Function(Lang, String?);

/// Pipeline of rules to apply to a string.
String? Function(String?) rules(List<String? Function(Lang, String?)> fns) {
  final lang = Lang.of(navigatorKey.currentContext!);

  return (String? input) {
    for (Rule fn in fns) {
      final result = fn(lang, input);
      if (result != null) {
        return capitalize(result);
      }
    }

    return null;
  };
}

/// A [Rule] that check if the input is not empty.
String? requiredRule(Lang lang, String? input) {
  if (input?.isEmpty ?? false) {
    return lang.trans('validation.required');
  }
  return null;
}

/// A [Rule] that check if the input is a valid email.
String? emailRule(Lang lang, String? input) {
  if (input == null || input.isEmpty) {
    return null;
  }

  if (!RegExp(r'^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$', caseSensitive: false)
      .hasMatch(input)) {
    return lang.trans('validation.email');
  }

  return null;
}

/// A [Rule] that check if the input is equals to the [value] input.
Rule equalsRule(String? Function() value, String value1, String value2) {
  return (Lang lang, String? input) {
    if (input != value()) {
      return lang.trans('validation.equals', replace: {
        '0': value1,
        '1': value2,
      });
    }

    return null;
  };
}
