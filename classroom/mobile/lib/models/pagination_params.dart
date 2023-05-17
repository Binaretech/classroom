import 'package:equatable/equatable.dart';

class PaginationParams extends Equatable {
  final int limit;
  final int total;

  const PaginationParams({
    required this.limit,
    required this.total,
  });

  @override
  List<Object?> get props => [limit, total];
}
