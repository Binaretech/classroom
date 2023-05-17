package array

func Map[T any, R any](array []T, mapper func(T) R) []R {
	result := make([]R, len(array))

	for i, item := range array {
		result[i] = mapper(item)
	}

	return result
}

func Contains[T comparable](array []T, comparation func(T) bool) bool {
	for _, item := range array {
		if comparation(item) {
			return true
		}
	}
	return false
}

func Missing[T comparable](base []T, comparation []T) []T {
	ma := make(map[T]bool, len(base))

	for _, ka := range base {
		ma[ka] = true
	}

	result := []T{}

	for _, kb := range comparation {
		if !ma[kb] {
			result = append(result, kb)
		}
	}

	return result
}

func Reduce[T any](arr []T, f func(T, T) T, initial T) T {
	acc := initial
	for _, v := range arr {
		acc = f(acc, v)
	}
	return acc
}
