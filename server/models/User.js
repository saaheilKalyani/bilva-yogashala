const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  phone: { type: String, trim: true },
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  address: { type: String },
  pincode: { type: String },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String,
  },
  medicalConditions: { type: String, default: 'None' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'pending'], default: 'pending' },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
