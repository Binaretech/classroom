package utils

import "mime"

func ExtensionByMime(mimeType string) string {
	extensions, _ := mime.ExtensionsByType(mimeType)

	if len(extensions) > 0 {
		return extensions[0]
	}

	return ""
}
