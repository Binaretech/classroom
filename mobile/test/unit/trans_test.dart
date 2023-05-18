import 'package:classroom_mobile/lang/lang.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('Translate simple key', () {
    final lang = Lang(const Locale('es'));

    final text = lang.trans('attributes.name');

    expect(text, 'nombre');
  });
}
