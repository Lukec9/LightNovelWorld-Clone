export default function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 10000) {
    return Math.floor(num / 1000) + "K";
  } else if (num >= 1000) {
    return Math.floor(num / 1000).toFixed(2) + "K";
  } else {
    return num; // for numbers less than 1000
  }
}
