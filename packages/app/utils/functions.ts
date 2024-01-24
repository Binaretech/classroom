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

export function flatPaginatedData<T, K extends {}>(
  data: T[],
  getArrayData: (item: T) => K[],
  getId: (item: K) => number | string = (item) => item['id']!
) {
  const { ids, items } = data.reduce(
    (acc, curr) => {
      acc.ids.push(...getArrayData(curr).map(getId));

      const map = getArrayData(curr).reduce(
        (acc, item) => {
          acc[getId(item)] = item;
          return acc;
        },
        {} as Record<number | string, K>
      );

      acc.items = { ...acc.items, ...map };

      return acc;
    },
    { ids: [] as (number | string)[], items: {} as Record<number, K> }
  );

  return Array.from(new Set(ids)).map((id) => items[id]);
}
