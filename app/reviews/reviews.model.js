export default function(sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.DECIMAL(4,2),
      validate: {
        isDecimal: true,
        max: 5.0,
        min: 0.0,
      },
    },
    text: {
      type: DataTypes.TEXT,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Game);
  };

  return Review;
};
