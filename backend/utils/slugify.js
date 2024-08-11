function slugify(string) {
  return string
    .toString() // Ensure the input is a string
    .normalize("NFD") // Normalize the string to separate diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents, etc.)
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters (only alphanumeric, spaces, and hyphens allowed)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphens from the start
    .replace(/-+$/, ""); // Trim hyphens from the end
}

export default slugify;
