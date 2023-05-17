import 'package:classroom_mobile/lang/es/es.dart';
import 'package:classroom_mobile/lang/en/en.dart';
import 'package:flutter/material.dart';

final _store = {
  'es': es,
  'en': en,
};

const allowedLocales = ['es', 'en'];

/// Handles the localization of the app based on the device's locale and the available translations.
/// The translations are stored in a map, where the key is the locale and the value is the map of translations.
class Lang {
  final Locale locale;

  Lang(this.locale);

  /// Create a Lang instance based on the device's locale.
  factory Lang.of(BuildContext context) {
    return Lang(Localizations.localeOf(context));
  }

  /// Returns the translation for the given translation string. If the translation is not found, the string is returned
  String trans(String text,
      {bool capitalize = false, Map<String, String> replace = const {}}) {
    final lang = locale.languageCode;

    if (!allowedLocales.contains(lang)) {
      return text;
    }

    final split = text.split('.');

    dynamic message = _store[lang];

    for (final part in split) {
      if (!(message?.containsKey(part) ?? false)) {
        return text;
      }

      message = message[part];
    }

    if (message is String) {
      final str = replace.entries.fold<String>(
        message,
        (previousValue, element) => previousValue.replaceAll(
            RegExp(r'\{\{${element.key}\}\}'), element.value),
      );

      if (capitalize) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
      }

      return str;
    }

    return text;
  }

  /// Returns the translation for the given translation key and a choice for pluralization. If the translation is not found, the key is returned.
  String choice(String key, int choice,
      {bool capitalize = false, Map<String, String> replace = const {}}) {
    final text = trans(key);

    final conditions = RegExp(r'({\d+}|\[[\d+\*],[\d+\*]\])')
        .allMatches(text)
        .toList(growable: false);

    final index = conditions.indexWhere(
        (condition) => _testChoiceCondition(condition.group(0) ?? '', choice));

    if (index == -1) {
      return text;
    }

    final result = text.split('|')[index];

    final message = result
        .replaceAll(RegExp(r'({\d+}|\[[\d+\*],[\d+\*]\])'), '')
        .replaceAll(':count', choice.toString())
        .trim();

    return capitalize
        ? message.substring(0, 1).toUpperCase() + message.substring(1)
        : message;
  }

  bool _testChoiceCondition(String condition, int choice) {
    if (RegExp(r'{\d+}').hasMatch(condition)) {
      return choice == int.parse(condition.replaceAll(RegExp(r'{|}'), ''));
    }

    if (RegExp(r'\[\d+,\d+\]').hasMatch(condition)) {
      final bounds = condition
          .replaceAll(RegExp(r'[\[\]]'), '')
          .split(',')
          .map((bound) => int.parse(bound))
          .toList();
      return choice >= bounds[0] && choice <= bounds[1];
    }

    if (RegExp(r'\[\d+,\*\]').hasMatch(condition)) {
      final bound = int.parse(condition.replaceAll(RegExp(r'[\,\[\]\*]'), ''));
      return choice >= bound;
    }

    if (RegExp(r'\[\*,\d+\]').hasMatch(condition)) {
      final bound = int.parse(condition.replaceAll(RegExp(r'[\[\]]'), ''));
      return choice <= bound;
    }

    return false;
  }
}
