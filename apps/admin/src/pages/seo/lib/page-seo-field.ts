export function pageSeoField(path: string, field: string) {
  return `pages[${JSON.stringify(path)}].${field}`
}
