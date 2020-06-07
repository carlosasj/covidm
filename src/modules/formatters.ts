export function isoDateToHuman(isoDate: string) {
  return isoDate.split('T')[0].split('-').reverse().join('/');
}

export function isoDateToShort(isoDate: string) {
  return isoDate.split('T')[0].split('-').slice(1, 3).reverse().join('/');
}
