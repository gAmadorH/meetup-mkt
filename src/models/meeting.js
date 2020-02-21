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
    }
  }, {
    paranoid: true
  })

  Meeting.associate = (models) => {
    Meeting.belongsToMany(models.User, { through: models.MeetingUsers })
  }

  return Meeting
}
