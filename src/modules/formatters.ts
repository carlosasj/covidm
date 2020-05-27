export function isoDateToHuman(isoDate: string) {
  return isoDate.split('T')[0].split('-').reverse().join('/');
}
