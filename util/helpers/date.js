exports.getDate = () => {
  const time = new Date();
  return time.toDateString();
};

exports.getMinDate = () => {
  const time = new Date();
  return time.toISOString().split("T")[0];
};
