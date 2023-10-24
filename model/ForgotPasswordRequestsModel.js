const { UUID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const forgotUserSchema = new Schema({
  uuid: {
    type: UUID,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ForgotUser = mongoose.model("ForgotUser", forgotUserSchema);
module.exports = ForgotUser;
