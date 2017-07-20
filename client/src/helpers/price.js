export function getPriceEstimate(games = []) {
  return games
    .reduce((total, game) => {
      return total + (game.price !== null ? Number(game.price) : 0);
    }, 0)
    .toFixed(2);
}
