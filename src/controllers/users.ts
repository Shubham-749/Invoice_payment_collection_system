import * as UserRepository from '../db/user';
import { Request, Response } from "express";
import { UserStatus } from '../enums/UserStatus';
import { User } from '../entities/User';
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';

export const addUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = new User();
    user.username = name;
    await UserRepository.addOrUpdateUser(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const user = await UserRepository.getUserById(Number(user_id));
    user.status = UserStatus.INACTIVE;
    const deletedUser = await UserRepository.addOrUpdateUser(user);

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserRepository.getUserById(Number(id));

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User does not exist")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error("Password incorrect")
    }

    res.status(200).json({ "success": true })
  }
  catch (err) {
    console.log(err.message)
    res.status(400).json({ "success": false })
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;

    let userExist = await UserRepository.getUserByEmail(email);
    if (userExist) {
      throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)

    password = await bcrypt.hash(password, salt)

    const user = new User();
    user.username = name;
    user.email = email;
    user.password = password;
    await UserRepository.addOrUpdateUser(user);

    res.status(201).json({ "success": true })
  }
  catch (err) {
    console.log(err.message)
    res.status(400).json({ "success": false })
  }
}