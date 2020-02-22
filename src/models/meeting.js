module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    paranoid: true
  })

  Meeting.associate = (models) => {
    Meeting.belongsToMany(models.User, { through: models.MeetingUsers })
    Meeting.belongsTo(models.User, { foreignKey: 'hostId' })
  }

  return Meeting
}
