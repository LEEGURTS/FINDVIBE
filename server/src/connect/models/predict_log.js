const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const UserInfo = require('./user_info');

const RequestLog = sequelize.define(
  "predict_request_log",
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    img_src: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    req_time: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

RequestLog.belongsTo(UserInfo, { foreignKey: "user_id", onDelete: "CASCADE" });

const ResponseLog = sequelize.define(
  "predict_response_log",
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    req_log_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    res_time: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

ResponseLog.belongsTo(RequestLog, { foreignKey: "req_log_id", onDelete: "CASCADE" });
ResponseLog.belongsTo(UserInfo, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = {
  RequestLog : RequestLog,
  ResponseLog : ResponseLog,
};
