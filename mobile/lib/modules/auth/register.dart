import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/auth/widgets/google_sign_in_button.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:classroom_mobile/widgets/linear_loader.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:classroom_mobile/modules/auth/widgets/auth_title.dart';
import 'package:classroom_mobile/widgets/password_input.dart';
import 'package:get_it/get_it.dart';

/// A form to register a new user.
class RegisterData {
  String? email;
  String? password;
  String? passwordConfirmation;
}

/// Register screen for new users to create an account on the app.
class Register extends StatefulWidget {
  static const route = '/register';

  const Register({Key? key}) : super(key: key);

  @override
  RegisterState createState() => RegisterState();
}

class RegisterState extends State<Register> {
  final _formKey = GlobalKey<FormState>();
  final RegisterData _registerData = RegisterData();

  final AuthRepository repository = GetIt.I<AuthRepository>();

  bool remember = false;

  bool isLoading = false;

  @override
  dispose() {
    repository.close();
    super.dispose();
  }

  submit() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    _formKey.currentState!.save();

    setState(() {
      isLoading = true;
    });

    repository
        .register(
      _registerData.email ?? '',
      _registerData.password ?? '',
    )
        .then((response) {
      Navigator.restorablePushNamedAndRemoveUntil(
          context, '/', (route) => false);
    }).catchError((_) {
      setState(() {
        isLoading = false;
      });
    });
  }

  toggleRemember(value) {
    setState(() {
      remember = value ?? false;
    });
  }

  void login(BuildContext context) {
    final navigator = Navigator.of(context);

    navigator.pushNamed('/login');
  }

  Widget inputs() {
    final lang = Lang.of(context);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: TextInput(
            onSaved: (value) {
              _registerData.email = value;
            },
            keyboardType: TextInputType.emailAddress,
            validation: const [requiredRule, emailRule],
            label: lang.trans(
              'attributes.email',
              capitalize: true,
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: PasswordInput(
            onSaved: (value) {
              _registerData.password = value;
            },
            validation: const [requiredRule],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: PasswordInput(
            label: lang.trans('attributes.password_confirm', capitalize: true),
            onSaved: (value) {
              _registerData.passwordConfirmation = value;
            },
            validation: const [requiredRule],
          ),
        ),
      ],
    );
  }

  Widget loginLink() {
    final lang = Lang.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: Text(
              lang.trans('views.register.have_an_account', capitalize: true),
              style: const TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          GestureDetector(
            onTap: () => login(context),
            child: Text(
              lang.trans('views.register.login', capitalize: true),
              style: const TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.w500,
                color: Colors.blue,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget rememberCheck() {
    final lang = Lang.of(context);

    return Row(
      children: [
        Radio(
          value: true,
          groupValue: remember,
          toggleable: true,
          onChanged: toggleRemember,
        ),
        Text(
          lang.trans('views.login.remember_me', capitalize: true),
          style: const TextStyle(
            fontSize: 12.0,
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final lang = Lang.of(context);

    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          child: LinearLoader(
            isLoading: isLoading,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(40.0),
                  child: Column(
                    children: [
                      AuthTitle(
                        title: lang.trans('views.register.title'),
                      ),
                      Form(
                        key: _formKey,
                        child: inputs(),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 20.0),
                        child: rememberCheck(),
                      ),
                      ElevatedButton(
                        onPressed: isLoading ? null : submit,
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size.fromHeight(40.0),
                        ),
                        child: Text(
                          lang.trans('messages.accept').toUpperCase(),
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 14.0,
                          ),
                        ),
                      ),
                      GoogleSignInButton(),
                      loginLink(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
