import 'dart:convert';

import 'package:equatable/equatable.dart';

class Class extends Equatable {
  final int id;
  final String name;
  final String? description;
  final String ownerId;
  final bool isTeacher;
  final bool isStudent;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Class({
    required this.id,
    required this.name,
    required this.createdAt,
    required this.ownerId,
    required this.updatedAt,
    this.isTeacher = false,
    this.isStudent = false,
    this.description,
  });

  Class.fromMap(Map<String, dynamic> data)
      : id = data['id'],
        name = data['name'] as String,
        description = data['description'] as String?,
        ownerId = data['ownerId'] as String,
        isTeacher =
            data['isTeacher'] != null ? data['isTeacher'] as bool : false,
        isStudent =
            data['isStudent'] != null ? data['isStudent'] as bool : false,
        createdAt = DateTime.parse(data['createdAt'] as String).toLocal(),
        updatedAt = DateTime.parse(data['updatedAt'] as String).toLocal();

  Class.fromJson(String source)
      : this.fromMap(json.decode(source) as Map<String, dynamic>);

  static List<Class> fromList(List<dynamic> data) {
    return data.map((e) => Class.fromMap(e as Map<String, dynamic>)).toList();
  }

  static Class? tryFromJson(String? json) {
    if (json == null) return null;

    final data = jsonDecode(json) as Map<String, dynamic>;

    return Class.fromMap(data);
  }

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "isTeacher": isTeacher,
        "isStudent": isStudent,
        "createdAt": createdAt.toIso8601String(),
        "updatedAt": updatedAt.toIso8601String(),
      };

  @override
  List<Object?> get props => [id, name, description, createdAt, updatedAt];
}
