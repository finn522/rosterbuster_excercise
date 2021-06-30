export default function dateParser(date) {
  let parts = date.match(/(\d+)/g);
  const dateItem = new Date(parts[2], parts[1] - 1, parts[0]);
  return dateItem;
}
