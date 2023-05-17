import 'dart:io';

import 'package:classroom_mobile/http/request.dart';
import 'package:classroom_mobile/repository/auth_repository.dart';
import 'package:classroom_mobile/repository/class_repository.dart';
import 'package:classroom_mobile/repository/post_repository.dart';
import 'package:classroom_mobile/repository/section_repository.dart';
import 'package:classroom_mobile/repository/user_repository.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

void registerProviders() {
  GetIt.I.registerSingleton<Locale>(Locale(Platform.localeName.split('_')[0]));

  GetIt.I.registerFactory<Request>(() => Request());

  GetIt.I.registerFactory<AuthRepository>(() => AuthRepositoryImplementation());
  GetIt.I.registerFactory<UserRepository>(() => UserRepositoryImplementation());
  GetIt.I
      .registerFactory<ClassRepository>(() => ClassRepositoryImplementation());
  GetIt.I.registerFactory<SectionRepository>(
      () => SectionRepositoryImplementation());
  GetIt.I.registerFactory<PostRepository>(() => PostRepositoryImplementation());
}
