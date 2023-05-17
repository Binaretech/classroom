import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/lang/lang.dart';
import 'package:classroom_mobile/modules/auth/widgets/google_sign_in_button.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:classroom_mobile/utils/validation.dart';
import 'package:classroom_mobile/widgets/linear_loader.dart';
import 'package:classroom_mobile/widgets/text_input.dart';
import 'package:flutter/material.dart';
import 'package:classroom_mobile/modules/auth/widgets/auth_title.dart';
import 'package:classroom_mobile/widgets/password_input.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

/// Form data to be submitted to the server
class LoginData {
  String? email;
  String? password;
}

/// Login screen for the application that allows the user to login with their email and password credentials and then redirects to the home screen if successful
class Login extends StatefulWidget {
  static const route = '/login';

  const Login({Key? key}) : super(key: key);

  @override
  LoginState createState() => LoginState();
}

class LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  final LoginData _loginData = LoginData();

  final AuthRepository repository = GetIt.I<AuthRepository>();

  bool isLoading = false;

  @override
  dispose() {
    repository.close();

    super.dispose();
  }

  submit() {
    return () {
      if (!_formKey.currentState!.validate()) {
        return;
      }

      _formKey.currentState!.save();

      setState(() {
        isLoading = true;
      });

      repository
          .login(
        _loginData.email ?? '',
        _loginData.password ?? '',
      )
          .then((value) {
        context
            .read<AuthenticationBloc>()
            .add(AuthenticateUser(value.token.accessToken));

        Navigator.restorablePushNamedAndRemoveUntil(
            context, '/', (route) => false);
      }).catchError((error) {
        setState(() {
          isLoading = false;
        });
      });
    };
  }

  void register(BuildContext context) {
    final navigator = Navigator.of(context);

    navigator.pushNamed('/register');
  }

  Widget inputs() {
    final lang = Lang.of(context);

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: TextInput(
            label: lang.trans('attributes.email', capitalize: true),
            keyboardType: TextInputType.emailAddress,
            onSaved: (value) {
              _loginData.email = value;
            },
            validation: const [requiredRule, emailRule],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 16.0),
          child: PasswordInput(
            onSaved: (value) {
              _loginData.password = value;
            },
            validation: const [requiredRule],
          ),
        ),
      ],
    );
  }

  Widget registerLink() {
    final lang = Lang.of(context);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: Text(
              lang.trans('views.login.dont_have_an_account', capitalize: true),
              style: const TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          GestureDetector(
            onTap: () => register(context),
            child: Text(
              lang.trans('views.login.register', capitalize: true),
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
                        title:
                            lang.trans('views.login.title', capitalize: true),
                      ),
                      Form(
                        key: _formKey,
                        child: inputs(),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 20.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              lang.trans('views.login.forgot_password'),
                              style: TextStyle(
                                fontSize: 12.0,
                                color: Theme.of(context).colorScheme.primary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        onPressed: isLoading ? null : submit(),
                        style: ElevatedButton.styleFrom(
                          minimumSize: const Size.fromHeight(40.0),
                        ),
                        child: Text(
                          lang.trans('messages.accept').toUpperCase(),
                          style: const TextStyle(
                              fontWeight: FontWeight.w700, fontSize: 14.0),
                        ),
                      ),
                      GoogleSignInButton(),
                      registerLink(),
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
