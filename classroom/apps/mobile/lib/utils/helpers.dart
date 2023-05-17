import 'dart:async';

import 'package:classroom_mobile/models/user.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:path/path.dart';

String unnacent(String string) {
  const diacritics =
      'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  const nonDiacritics =
      'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';

  return string.splitMapJoin('',
      onNonMatch: (char) => char.isNotEmpty && diacritics.contains(char)
          ? nonDiacritics[diacritics.indexOf(char)]
          : char);
}

String capitalize(String str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

DateTime parseDate(String date, [String format = 'yyyy-MM-ddTHH:mm:ss.SZ']) {
  return DateFormat(format).parseUTC(date).toLocal();
}

class LoadedConfiguration {
  final String token;
  final User? user;

  LoadedConfiguration({this.token = '', this.user});
}

Future<LoadedConfiguration> loadSession() async {
  final prefs = await SharedPreferences.getInstance();

  final token = prefs.getString('token');

  return LoadedConfiguration(token: token ?? '');
}

/// Shows a loading dialog with the given [context]
Future<void> showLoadingDialog(BuildContext context) async {
  return showDialog(
    context: context,
    barrierDismissible: false,
    builder: (context) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    },
  );
}

/// Returns true if string is a URL
bool isURL(String? string) {
  if (string == null) {
    return false;
  }

  return Uri.tryParse(string)?.hasAbsolutePath ?? false;
}

IconData getIconForFile(String fileName) {
  final ext = extension(fileName).toLowerCase();
  switch (ext) {
    case '.pdf':
      return Icons.picture_as_pdf;
    case '.doc':
    case '.docx':
      return Icons.description;
    case '.xls':
    case '.xlsx':
      return Icons.table_chart;
    case '.ppt':
    case '.pptx':
      return Icons.slideshow;
    case '.zip':
    case '.rar':
      return Icons.archive;
    case '.mp3':
    case '.wav':
      return Icons.audiotrack;
    case '.mp4':
    case '.avi':
    case '.mov':
      return Icons.movie;
    case '.jpg':
    case '.jpeg':
    case '.png':
    case '.gif':
      return Icons.image;
    default:
      return Icons.insert_drive_file;
  }
}

bool isImage(String fileName) {
  final ext = extension(fileName).toLowerCase();
  return ext == '.jpg' || ext == '.jpeg' || ext == '.png' || ext == '.gif';
}
