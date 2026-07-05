/** Slug destinasi → halaman detail SEO */
export const DEST_DETAIL_PATH: Record<string, string> = {
  'batu-malang': '/destinasi/batu-malang',
  'bromo': '/destinasi/bromo',
  'bali': '/destinasi/nusa-penida',
  'jogja': '/destinasi/jogja',
  'lombok': '/destinasi/lombok',
  'banyuwangi': '/destinasi/banyuwangi',
}

export function getDestPath(slug: string): string | undefined {
  return DEST_DETAIL_PATH[slug]
}
