import {
    Request,
    Response,
  } from 'express';
  import httpStatus from 'http-status';
  
  import catchAsync from '../../../shared/catchAsync';
  import sendResponse from '../../../shared/sendResponse';
  import { AuthenticationService } from './auth.service';
  
  const addUsers = catchAsync(
    async (req: Request, res: Response) => {
      const { data } = req.body;
      const post = await AuthenticationService.createUser(data)
      // Send success response
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: post, 
      });
    },
  )
  
  
  const getUsers = catchAsync(
    async (req: Request, res: Response) => {
      const users = await AuthenticationService.getUsers();
      // Send success response
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: users,
      });
    },
  );
  
  export const AuthenticationController = {
    getUsers,
    addUsers
  };
  