import 'dart:convert';

import 'package:classroom_mobile/models/file.dart';
import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String name;
  final String email;
  final String lastname;
  final File? profileImage;

  const User({
    required this.id,
    required this.name,
    required this.lastname,
    required this.email,
    this.profileImage,
  });

  User.fromMap(Map<String, dynamic> data)
      : id = data['id'] as String,
        name = data['name'] as String,
        lastname = data['lastname'] as String,
        email = data['email'] as String,
        profileImage = data['profileImage'] != null
            ? File.fromMap(data['profileImage'])
            : null;

  User.fromJson(String source)
      : this.fromMap(json.decode(source) as Map<String, dynamic>);

  static List<User> fromList(List<dynamic> data) {
    return data.map((e) => User.fromMap(e as Map<String, dynamic>)).toList();
  }

  static User? tryFromJson(String? json) {
    if (json == null) return null;

    final data = jsonDecode(json) as Map<String, dynamic>;

    if (data.isEmpty) return null;

    return User.fromMap(data);
  }

  String get fullName => "$name $lastname";

  @override
  List<Object?> get props => [id, name, lastname, profileImage];

  Map<String, Object?> toMap() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'lastname': lastname,
      'profileImage': profileImage?.toMap(),
    };
  }
}
