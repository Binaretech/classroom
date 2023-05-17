part of 'configuration_bloc.dart';

class ConfigurationState extends Equatable {
  final Locale locale;
  final ThemeMode themeMode;

  ConfigurationState({
    Locale? locale,
    this.themeMode = ThemeMode.system,
  }) : locale = locale ?? Locale(Platform.localeName);
  @override
  List<Object> get props => [locale.languageCode, themeMode];
}
