import 'package:classroom_mobile/modules/auth/login.dart';
import 'package:classroom_mobile/modules/auth/register.dart';
import 'package:classroom_mobile/modules/class/class_view.dart';
import 'package:classroom_mobile/modules/home/home.dart';
import 'package:classroom_mobile/modules/section/section_view.dart';

final routes = {
  Home.route: (_) => const Home(),
  Login.route: (_) => const Login(),
  Register.route: (_) => const Register(),
  ClassView.route: (_) => const ClassView(),
  SectionView.route: (_) => const SectionView(),
};
