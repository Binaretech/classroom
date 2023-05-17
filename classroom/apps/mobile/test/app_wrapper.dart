import 'package:classroom_mobile/globals.dart';
import 'package:flutter/material.dart';

class AppWrapper extends StatelessWidget {
  final Widget child;

  final List<NavigatorObserver> observers;

  final RouteFactory? onGenerateRoute;

  const AppWrapper(
      {Key? key,
      required this.child,
      this.observers = const [],
      this.onGenerateRoute})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      onGenerateRoute: onGenerateRoute,
      navigatorObservers: observers,
      title: 'Flutter Demo',
      navigatorKey: navigatorKey,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      locale: const Locale('en'),
      home: child,
    );
  }
}
