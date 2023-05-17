class PaginatedObject<K, T> {
  final Map<K, T> data;
  final int page;
  // final int total;
  // final int limit;
  // final int pages;

  const PaginatedObject({
    this.data = const {},
    this.page = 1,
    // required this.total,
    // required this.limit,
    // required this.pages,
  });
}
