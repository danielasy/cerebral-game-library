'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Genre.associate = function (models) {
    Genre.belongsToMany(models.Game, { through: 'GameGenre' });
  };

  return Genre;
};

;