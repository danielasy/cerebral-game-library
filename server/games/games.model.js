export default function(sequelize, DataTypes) {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING(140),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    relase: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      validate: {
        isDecimal: true,
      },
    },
  });

  Game.associate = (models) => {
    Game.hasOne(models.Review);
    Game.belongsToMany(models.Genre, { through: 'GameGenre' });
    Game.belongsToMany(models.Platform, { through: 'GamePlatform' });
  };

  return Game;
};
