export default function(sequelize, DataTypes) {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING(140),
    },
    relase: {
      type: DataTypes.DATEONLY,
    },
    price: {
      type: DataTypes.STRING,
    },
  });

  Game.associate = (models) => {
    Game.hasOne(models.Review);
    Game.belongsToMany(models.Genre, { through: 'GameGenre' });
    Game.belongsToMany(models.Platform, { through: 'GamePlatform' });
  };

  return Game;
};
