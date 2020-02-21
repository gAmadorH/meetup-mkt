module.exports = (sequelize, DataTypes) => {
  const MeetingUsers = sequelize.define('MeetingUsers', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    updatedAt: false,
    paranoid: true
  })

  return MeetingUsers
}
