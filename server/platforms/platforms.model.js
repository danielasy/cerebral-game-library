export default function(sequelize, DataTypes) {
  const Platform = sequelize.define('Platform', {
    name: {
      type: DataTypes.STRING(70),
      validate: {
        notEmpty: true,
      },
    },
  });

  Platform.associate = (models) => {
    Platform.belongsToMany(models.Game, { through: 'GamePlatform' });
  };

  return Platform;
};
