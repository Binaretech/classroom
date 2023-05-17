class Token {
  final String accessToken;
  final String refreshToken;
  final DateTime accessExpires;

  Token(this.accessToken, this.refreshToken, this.accessExpires);

  factory Token.fromJson(Map<String, dynamic> json) {
    return Token(
      json['accessToken'],
      json['accessToken'],
      DateTime.fromMillisecondsSinceEpoch(json['accessExpires']),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'accessToken': accessToken,
      'refreshToken': refreshToken,
      'accessExpires': accessExpires.millisecondsSinceEpoch,
    };
  }
}
