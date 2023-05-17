class PaginatedData<T> {
  final List<T> data;
  final int page;
  final int total;
  final int limit;
  final int pages;

  const PaginatedData({
    required this.data,
    required this.page,
    required this.total,
    required this.limit,
    required this.pages,
  });

  factory PaginatedData.fromJson(Map<String, dynamic> json,
          List<T> Function(List<dynamic>) dataParser) =>
      PaginatedData(
        data: dataParser(json['data']),
        page: json['page'] as int,
        total: json['total'] as int,
        limit: json['limit'] as int,
        pages: json['pages'] as int,
      );

  Map<K, T> dataToMap<K>(K Function(T) key) {
    return data.fold({}, (prev, element) {
      return {...prev, key(element): element};
    });
  }
}
