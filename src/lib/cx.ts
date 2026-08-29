/** Junta class names ignorando falsos. Evita `className={`a ${b ?? ''}`}` espalhado. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
