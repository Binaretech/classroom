import 'package:classroom_mobile/models/class.dart';
import 'package:equatable/equatable.dart';

class Section extends Equatable {
  final int id;
  final String name;
  final int classId;
  final Class? clss;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  const Section({
    required this.id,
    required this.name,
    required this.classId,
    this.createdAt,
    this.updatedAt,
    this.clss,
  });

  factory Section.fromMap(Map<String, dynamic> json) {
    return Section(
      id: json["id"],
      name: json["name"],
      classId: json["classId"],
      createdAt: DateTime.tryParse(json["createdAt"])?.toLocal(),
      updatedAt: DateTime.tryParse(json["updatedAt"])?.toLocal(),
      clss: json["class"] != null ? Class.fromMap(json["class"]) : null,
    );
  }

  static List<Section> fromList(List<dynamic> data) {
    return data.map((e) => Section.fromMap(e as Map<String, dynamic>)).toList();
  }

  @override
  List<Object?> get props => [name, classId];
}
