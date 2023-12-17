export function stringToHexColor(string: string) {
  const hash = string
    .split('')
    .reduce((hash, char) => char.charCodeAt(0) + ((hash << 5) - hash), 0)
    .toString(16);

  return `#${hash.slice(0, 6)}`;
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
