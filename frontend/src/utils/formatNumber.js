export default function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M"; // 1M
  } else if (num >= 1000) {
    return Math.floor(num / 1000) + "K"; // Keep exact thousands, e.g., 958K
  } else {
    return num; // for numbers less than 1000
  }
}
