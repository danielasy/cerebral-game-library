function getData(game, field) {
  switch (field) {
    case 'title':
      return game.title;
    case 'rating':
      return game.Review ? game.Review.rating : 0;
    case 'release':
      return game.release ? game.release : 0;
    default:
      return 0;
  }
}

export function sortGames(games = [], sortBy = 'title-asc') {
  const [ field, order ] = sortBy.split('-');
  const orderFactor = (order === 'asc') ? 1 : -1; // Ascending: 1, Descending: -1

  const gamesToSort = games.filter(game => getData(game, field));
  const otherGames = games.filter(game => !getData(game, field));

  return gamesToSort.sort((game1, game2) => {
    const field1 = getData(game1, field);
    const field2 = getData(game2, field);

    return (field1 == field2) ? 0 : ((field1 > field2) ? orderFactor : -orderFactor)
  }).concat(otherGames);
}
