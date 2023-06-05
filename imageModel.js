const mongoose = require("mongoose");

const KycSchema = mongoose.Schema({
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  image: {
    data: String,
    contentType: String,
  },
});

module.exports = mongoose.model("Kyc", KycSchema);
