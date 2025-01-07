import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "User name cannot be empty"],
    },
    email: {
      type: String,
      required: [true, "Provide your email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be at least 8 characters"],
      minlength: 8,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
// compair user password

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      //payload
      id: this._id,
      email: this.email,
    },
    "temporary_random_secret_key_12345", // Temporary secret key for now
    {
      expiresIn: "1h",
    }
  );

  return token;
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
