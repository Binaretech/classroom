import 'package:classroom_mobile/models/file.dart';
import 'package:classroom_mobile/models/user.dart';

/// Represents a response with the user data.
class UserResource extends User {
  const UserResource({
    required String id,
    required String name,
    required String lastname,
    required String email,
    File? profileImage,
  }) : super(
          id: id,
          name: name,
          lastname: lastname,
          profileImage: profileImage,
          email: email,
        );

  factory UserResource.fromJson(Map<String, dynamic> user) {
    final profileImage = user['profileImage'] != null
        ? File(
            id: user['profileImage']['id'],
            key: user['profileImage']['key'],
            type: user['profileImage']['type'],
            bucket: user['profileImage']['bucket'],
            mimeType: user['profileImage']['mimeTYpe'],
            fileableType: user['profileImage']['fileableType'],
            fileableId: user['profileImage']['fileableId'])
        : null;

    return UserResource(
      id: user['id'],
      name: user['name'],
      email: user['email'],
      lastname: user['lastname'],
      profileImage: profileImage,
    );
  }
}
