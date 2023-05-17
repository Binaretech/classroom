import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'package:classroom_mobile/bloc/authentication/authentication_bloc.dart';
import 'package:classroom_mobile/bloc/configuration/configuration_bloc.dart';

class AppBlocBuilder extends StatelessWidget {
  final String token;
  final Widget Function(BuildContext, ConfigurationState, AuthenticationState)
      builder;

  const AppBlocBuilder({Key? key, this.token = '', required this.builder})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<AuthenticationBloc>(
            create: (_) => AuthenticationBloc(token: token)),
        BlocProvider<ConfigurationBloc>(create: (_) => ConfigurationBloc()),
      ],
      child: Builder(
        builder: (context) =>
            BlocBuilder<ConfigurationBloc, ConfigurationState>(
          bloc: context.read<ConfigurationBloc>(),
          builder: (BuildContext context, ConfigurationState config) {
            return BlocBuilder<AuthenticationBloc, AuthenticationState>(
              bloc: context.read<AuthenticationBloc>(),
              builder: (BuildContext context, AuthenticationState auth) {
                return builder(context, config, auth);
              },
            );
          },
        ),
      ),
    );
  }
}
