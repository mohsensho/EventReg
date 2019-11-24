module.exports = (sequelize, DataTypes) => {
  const Shift = sequelize.define("Shift", {
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Shift.associate = models => {
    Shift.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Shift.associate = models => {
    Shift.hasMany(models.User_Shift, {
      onDelete: "cascade"
    });
  };

  return Shift;
};
