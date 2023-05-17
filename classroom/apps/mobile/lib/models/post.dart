import 'dart:convert';

import 'package:classroom_mobile/models/user.dart';
import 'package:classroom_mobile/widgets/user_avatar.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/widgets.dart';

enum PostType {
  user(0);

  const PostType(this.value);
  final num value;

  static PostType getByValue(num type) {
    return PostType.values.firstWhere((x) => x.value == type);
  }
}

class Post extends Equatable {
  final int id;
  final String content;
  final PostType type;
  final int sectionId;
  final String userId;
  final User? user;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Post({
    required this.id,
    required this.content,
    required this.sectionId,
    required this.userId,
    required this.createdAt,
    required this.updatedAt,
    required this.type,
    this.user,
  });

  Post.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        content = json['content'],
        sectionId = json['sectionId'],
        userId = json['userId'],
        type = PostType.getByValue(json['type']),
        createdAt = DateTime.parse(json['createdAt']).toLocal(),
        updatedAt = DateTime.parse(json['updatedAt']).toLocal(),
        user =
            json['user'] != null ? User.fromMap(Map.from(json['user'])) : null;

  static List<Post> fromList(List<dynamic> list) {
    return list.map((e) => Post.fromJson(e)).toList();
  }

  String get titleByType =>
      type == PostType.user ? user?.fullName ?? '' : 'post';

  Widget avatarByType([double radius = 30]) => type == PostType.user
      ? UserAvatar(user: user!, radius: radius)
      : Container();

  @override
  List<Object?> get props => [
        id,
        type,
        content,
        sectionId,
        userId,
        user,
        createdAt,
        updatedAt,
      ];
}
