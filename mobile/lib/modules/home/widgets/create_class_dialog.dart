part of '../home.dart';

class ClassData {
  String name = '';
  String? description;

  void setName(String? value) {
    name = value ?? '';
  }

  void setDescription(String? value) {
    description = value;
  }
}

class _CreateClassDialog extends ConsumerStatefulWidget {
  final ClassRepository repository = GetIt.I<ClassRepository>();

  @override
  _CreateClassDialogState createState() => _CreateClassDialogState();
}

class _CreateClassDialogState extends ConsumerState<_CreateClassDialog> {
  final form = GlobalKey<FormState>();
  final classData = ClassData();

  bool loading = false;

  void _submit() async {
    if (!form.currentState!.validate()) {
      return;
    }

    form.currentState!.save();

    final navigator = Navigator.of(context);

    setState(() {
      loading = true;
    });

    try {
      await widget.repository
          .create(name: classData.name, description: classData.description);

      ref.invalidate(classPaginationProvider);
      ref.invalidate(paginatedClassProvider);

      navigator.pop();
    } catch (e) {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return AlertDialog(
      title: const Text('Create Class'),
      content: Form(
        key: form,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: TextInput(
                validation: const [requiredRule],
                label: lang.trans('attributes.className', capitalize: true),
                onSaved: classData.setName,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: TextInput(
                label: lang.trans('attributes.description', capitalize: true),
                onSaved: classData.setDescription,
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          style: TextButton.styleFrom(
            foregroundColor: Theme.of(context).colorScheme.error,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text(lang.trans('messages.cancel', capitalize: true)),
        ),
        TextButton(
          child: Text(lang.trans('messages.accept', capitalize: true)),
          onPressed: () {
            _submit();
          },
        ),
      ],
    );
  }
}
