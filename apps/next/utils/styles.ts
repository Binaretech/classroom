export function cls(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
