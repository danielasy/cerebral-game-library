'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Platform = sequelize.define('Platform', {
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Platform.associate = function (models) {
    Platform.belongsToMany(models.Game, { through: 'GamePlatform' });
  };

  return Platform;
};

;