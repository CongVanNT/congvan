const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const normalizeDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

module.exports = { timeToMinutes, normalizeDate };
