'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING(140),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    release: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    },
    price: {
      type: DataTypes.DECIMAL(6, 2),
      validate: {
        isDecimal: true
      }
    }
  });

  Game.associate = function (models) {
    Game.hasOne(models.Review);
    Game.belongsToMany(models.Genre, { as: 'genres', through: 'GameGenre' });
    Game.belongsToMany(models.Platform, { as: 'platforms', through: 'GamePlatform' });
  };

  return Game;
};

;