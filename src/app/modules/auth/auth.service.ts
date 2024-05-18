import httpStatus from 'http-status';
import {
  JwtPayload,
  Secret,
} from 'jsonwebtoken';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helper/jwtHelper';
import { sendMailerHelper } from '../../../helper/sendMailHelper';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

// login user
const userLogin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // checking isUserExist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // matching password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  // create accessToken & refresh token
  const { _id, role, email: Email, isEmailVerified, userName } = isUserExist;

  // create accessToken
  const accessToken = jwtHelpers.createToken(
    {
      userid: _id,
      userName: userName,
      role: role,
      email: Email,
    },
    config.jwt.token_secret as Secret,
    '2h',
  );

  // create refreshToken
  const refreshToken = jwtHelpers.createToken(
    {
      userid: _id,
      userName: userName,
      role: role,
      email: Email,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expirein as string,
  );

  return {
    accessToken,
    refreshToken,
    isEmailVerified,
  };
};

// send Verification email
const sendEmailVerificationMail = async (email: string): Promise<void> => {
  const isUserExist = await User.isUserExist(email);

  if (isUserExist?.isEmailVerified) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Your email is already verified',
    );
  }

  const validate = await jwtHelpers.createResetToken(
    { email: email },
    config.jwt.token_secret as string,
    '2m',
  );
  const verificationLink = config.verification_url + `?token=${validate}`;

  await sendMailerHelper.sendMail(
    email,
    'user Email verification',
    `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px;">
    <h1 style="color: #4CAF50;">Welcome to <span style="color: #4CAF50;">SocialAsync</span></h1>
    <p>Please verify your account by clicking the following link:</p>
    <button style=" padding: 12px 20px; background-color: #4CAF50; color: white; border-radius: 5px; border:none"><a href="${verificationLink}" style="text-decoration: none;color:white; font-weight:bold" >Verify Email</a></button>
   
    <p>Thank you!</p>
  </div>
  `,
  );

  return;
};

// forgot Password
// const forgotPassword = async (email: string) => {
//   const user = await User.findOne({ email: email });

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
//   }

//   const passResetToken = await jwtHelpers.createResetToken(
//     { id: user.id },
//     config.accessTokenSecret as Secret,
//     '50m',
//   );

//   const resetLink: string = config.resetlink + `token=${passResetToken}`;

//   // console.log('profile: ', profile);
//   await sendEmail(
//     profile.email,
//     `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `,
//   );

//   // return {
//   //   message: "Check your email!"
//   // }
// };

export const AuthService = {
  userLogin,
  refreshToken,
  changePassword,
  emailVerification,
  sendEmailVerificationMail,
};
