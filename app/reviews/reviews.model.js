export default function(sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.FLOAT,
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
