export const checkIfObjectHasEmptyProperties = (object) => {
  if (!object) {
    return false;
  }

  let flag = true;
  Object.values(object).forEach((value) => {
    if (value !== "") {
      flag = false;
    }
  });

  return flag;
};

export function formatDuration(start, end) {
  if (start === 0 || end === 0) {
    return "0m 0s";
  }

  let duration = end - start; // Calculate the difference in milliseconds
  let minutes = Math.floor(duration / 60000); // Convert to minutes
  let seconds = Math.floor((duration % 60000) / 1000); // Convert remainder to seconds
  return `${minutes}m ${seconds}s`;
}
