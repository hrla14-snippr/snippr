const stringConverter = (str) => {
  let query = '';
  const plus = str.split(' ');
  plus.forEach((word) => {
    query += `${word}+`;
  });
  query = query.slice(0, -1);
  console.log(query);
  return query;
};

module.exports = stringConverter;
