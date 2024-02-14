
import user from "../../models/clients/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      password: hash,
    });
    // console.log(newUser);
    await newUser.save();
    res.status(200).send("success");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    // Attempt to find the user by email
    const User = await user.findOne({ email: req.body.email });

    // If no user is found, return a 404 error
    if (!User) return next(createError(404, "user not found"));

    // Check if the provided password matches the stored hash
    const isCorrect = bcrypt.compareSync(req.body.password, User.password);
    if (!isCorrect) return next(createError(400, "wrong password or email"));

    // Generate a JWT token for the user
    const token = jwt.sign({ id: User._id }, process.env.JWT_KEY);

    // Exclude the password from the user object to be sent back
    const { password, ...info } = User._doc;

    // Send the token in a cookie and the user info in the response body
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send({ msg: "login success", ...info });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
