// Sort array by date
export const sortByDate = (array, mode) => {
  if(mode === "newest") {
    return array.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else if (mode === "oldest") {
    return array.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
}

export default { sortByDate };