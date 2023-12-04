import AppDataSource from "../../config/ormconfig";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User);

export const getAllUsers = () => UserRepository.find();
export const getUserById = (id: number) => UserRepository.findOneBy({id});
export const getUserByEmail = (email: string) => UserRepository.findOneBy({email});

export const addOrUpdateUser = (user: User) => UserRepository.save(user);