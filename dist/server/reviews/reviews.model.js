'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        max: 5.0,
        min: 0.0
      }
    },
    text: {
      type: DataTypes.TEXT
    }
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Game);
  };

  return Review;
};

;