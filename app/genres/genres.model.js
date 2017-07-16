export default function(sequelize, DataTypes) {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING(70),
    },
  });

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Game, { through: 'GameGenre' });
  };

  return Genre;
};
