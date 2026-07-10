/** Format a number as Argentine Peso, e.g. 84500 -> "$84.500". */
export function formatARS(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}
