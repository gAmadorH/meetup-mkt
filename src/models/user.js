module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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

  User.associate = (models) => {
    User.belongsToMany(models.Meeting, { through: models.MeetingUsers })
  }

  return User
}