import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:flutter/material.dart';

class TextInput extends StatelessWidget {
  final String? label;
  final void Function(String?)? onSaved;
  final bool obscureText;
  final List<String? Function(Lang, String?)> validation;
  final TextInputType? keyboardType;
  final TextEditingController? controller;
  final Widget? suffixIcon;
  final void Function(String)? onFieldSubmitted;
  final void Function(String)? onChanged;
  final FocusNode? focusNode;

  const TextInput({
    Key? key,
    this.validation = const [],
    this.label,
    this.onSaved,
    this.obscureText = false,
    this.keyboardType,
    this.controller,
    this.suffixIcon,
    this.onFieldSubmitted,
    this.focusNode,
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      onFieldSubmitted: onFieldSubmitted,
      keyboardType: keyboardType,
      focusNode: focusNode,
      decoration: InputDecoration(
        border: const OutlineInputBorder(),
        labelText: label,
        suffixIcon: suffixIcon,
      ),
      style: const TextStyle(
        fontSize: 16.0,
      ),
      onChanged: onChanged,
      validator: rules(validation),
      onSaved: onSaved,
    );
  }
}
