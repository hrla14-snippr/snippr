
exports.ChangeSnyppr = (currentSnyppr) => {
  console.log(currentSnyppr);
  return {
    type: 'CHANGE_SNYPPR',
    payload: currentSnyppr,
  };
};

