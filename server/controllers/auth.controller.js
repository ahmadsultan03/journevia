import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"))
  }

  // check if the user already exists
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return next(errorHandler(409, "User already exist with this email!"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()

    res.json("Signup successful")
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (
    !email ||
    !password
    || email === "" 
    || password === "") {
    return next(errorHandler(400, "All fields are required"))
  }

  try {
    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"))
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

    const { password: pass, ...rest } = validUser._doc

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest)
  } catch (error) {
    next(error)
  }
}
