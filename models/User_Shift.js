module.exports = (sequelize, DataTypes) => {
  const UserShift = sequelize.define("User_Shift", {
    checkedIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  UserShift.associate = models => {
    UserShift.belongsTo(models.Shift, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  UserShift.associate = models => {
    UserShift.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return UserShift;
};
