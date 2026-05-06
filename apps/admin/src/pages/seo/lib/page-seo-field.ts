export const pageSeoField = (path: string, field: string): string => {
  return `pages[${JSON.stringify(path)}].${field}`
}
