import 'package:flutter/material.dart';

class Dropdown extends StatelessWidget {
  final List<DropdownMenuItem<String>> list;
  final String label;
  final void Function(String?)? onChanged;
  final void Function(String?)? onSaved;
  final String Function(String?)? validator;

  const Dropdown({
    Key? key,
    required this.list,
    required this.label,
    this.onChanged,
    this.onSaved,
    this.validator,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      validator: validator,
      style: const TextStyle(fontSize: 16.0),
      decoration: InputDecoration(
        border: const OutlineInputBorder(),
        labelText: label,
      ),
      onChanged: onChanged,
      onSaved: onSaved,
      items: list,
    );
  }
}
