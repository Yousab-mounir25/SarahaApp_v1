import { model } from "mongoose";
import { create, findOne } from "../../common/repository/db.repository.js";
import { UserModel } from "../../DB/model/user.model.js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/index.js";
import { decryption, encryption,compare, hash } from "../../common/security/index.js";
export const signup = async (inputs) => {
  const { username, email, password, phone, age } = inputs;
  const existingUser = await findOne({
    filter: { email },
    options: { select: "email" },
    model: UserModel,
  });
  if (existingUser) {
    throw ConflictException("Email exist");
  }
  const user = await create({
    data: {
      username,
      email,
      password: await hash({ plainText: password }),
      phone:await encryption(phone),
      age,
    },
    model: UserModel,
  });
  return user;
};

export const login = async (inputs) => {
  const { email, password } = inputs;
  const existingUser = await findOne({
    filter: { email },
    model: UserModel,
  });
  if (!existingUser) {
    throw NotFoundException("invalid login credentials"); // check for email
  }
  const match = await compare(password, existingUser.password);
  if (!match) {
    throw NotFoundException("invalid login credentials"); //check for password
  }
  existingUser.phone = await decryption(existingUser.phone)
  return existingUser;
};
