module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("Event", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    venue: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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

  Event.associate = models => {
    Event.hasMany(models.Shift, {
      onDelete: "cascade"
    });
  };

  return Event;
};
