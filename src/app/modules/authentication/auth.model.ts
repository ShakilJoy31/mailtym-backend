import {
    model,
    Schema,
  } from 'mongoose';
  
  import { IAuthentication } from './auth.interface';
  
  const AuthenticationSchema = new Schema<IAuthentication>({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: Number },
    
  });
  
  export const AuthenticationModel = model<IAuthentication>('authenticatedUsers', AuthenticationSchema);