export default function isObjectEmpty(object: any) {
  return Object.keys(object).length === 0 && object.constructor === Object;
}