import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const hashPassword = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(8));
export const register = ({ email, password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          name,
          password: hashPassword(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role: response[0].role,
            },
            process.env.JWT_KEY,
            { expiresIn: "2d" }
          )
        : null;
      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register is success!" : "Email is used!",
        token,
      });
    } catch (error) {
      reject(error);
    }
  });
export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role: response.role,
            },
            process.env.JWT_KEY,
            { expiresIn: "2d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login is success!"
          : response
          ? "Password is wrong!"
          : "Unregistered email!",
        access_token: `Bearer ${token}`,
      });
    } catch (error) {
      reject(error);
    }
  });
