import 'package:classroom_mobile/models/class.dart';
import 'package:classroom_mobile/models/section.dart';
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
  final int posteableId;
  final String posteableType;
  final bool authorIsTeacher;
  final Section? section;
  final Class? cls;
  final String userId;
  final User? user;
  final DateTime createdAt;
  final DateTime updatedAt;

  const Post({
    required this.id,
    required this.content,
    required this.posteableId,
    required this.posteableType,
    required this.authorIsTeacher,
    this.section,
    this.cls,
    required this.userId,
    required this.createdAt,
    required this.updatedAt,
    required this.type,
    this.user,
  });

  Post.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        content = json['content'],
        posteableId = json['posteableId'],
        authorIsTeacher = json['authorIsTeacher'],
        posteableType = json['posteableType'],
        section = json['section'] != null
            ? Section.fromMap(Map.from(json['section']))
            : null,
        cls = json['class'] != null
            ? Class.fromMap(Map.from(json['class']))
            : null,
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

  String get className => section?.clss?.name ?? cls?.name ?? '';

  Widget avatarByType([double radius = 30]) => type == PostType.user
      ? UserAvatar(user: user!, radius: radius)
      : Container();

  @override
  List<Object?> get props => [
        id,
        type,
        content,
        posteableId,
        posteableType,
        userId,
        user,
        createdAt,
        updatedAt,
      ];
}
