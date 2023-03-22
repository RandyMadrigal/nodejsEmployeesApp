exports.validate = (vacation) => {
  let validate;
  if (vacation === true) {
    return (validate = false);
  }
  if (vacation === false) {
    return (validate = true);
  }
};
