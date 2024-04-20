import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["viewer", "editor", "admin"],
    default: "viewer",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  userObject.id = userObject._id;
  delete userObject._id;
  delete userObject.password;
  delete userObject.date;
  delete userObject.__v;

  return userObject;
};

const db = mongoose.connection.useDb("users", { useCache: true });
export default db.model("User", userSchema);
