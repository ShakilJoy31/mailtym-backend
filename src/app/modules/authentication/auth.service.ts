import { IAuthentication } from './auth.interface';
import { AuthenticationModel } from './auth.model';

const getUsers = async () => {
  const users = await AuthenticationModel.find();
  return users;
};

const createUser = async (payload:IAuthentication) => {
  // checking user existed
  const users = await AuthenticationModel.create(payload);
  return users;
};

export const AuthenticationService = {
  getUsers,
  createUser
};