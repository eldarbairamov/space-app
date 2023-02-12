import expressAsyncHandler from "express-async-handler";
import { Response } from "express";
import { changeEmailService, uploadAvatarService, updateProfileService, deleteAvatarService, changePasswordService, getUserInfoService, updateEmailService } from "../service";
import { IChangePassword, IUpdateProfile, IUserInfoResponse, IRequest } from "../interface";

export const userController = {

   updateProfile: expressAsyncHandler(async (req: IRequest<IUpdateProfile, any, any>, res: Response<IUpdateProfile>) => {
      const updatedUser = await updateProfileService(req.userId, req.body);
      res.json(updatedUser);
   }),

   changePassword: expressAsyncHandler(async (req: IRequest<IChangePassword, any, any>, res: Response<{ message: string }>) => {
      await changePasswordService(req.userId, req.body);
      res.json({ message: "Success" });
   }),

   changeEmailRequest: expressAsyncHandler(async (req: IRequest<{ email: string }, any, any>, res: Response<{ message: string }>) => {
      await updateEmailService(req.userId, req.body.email);
      res.json({ message: "Success" });
   }),

   changeEmail: expressAsyncHandler(async (req: IRequest<{ confirmationToken: string }, any, any>, res: Response<{ message: string }>) => {
      await changeEmailService(req.body.confirmationToken);
      res.json({ message: "Success" });
   }),

   getUser: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<IUserInfoResponse>) => {
      const userInfo = await getUserInfoService(req.userId);
      res.json(userInfo);
   }),

   uploadAvatar: expressAsyncHandler(async (req: IRequest<any, any, any>, res: Response<{ image: string }>) => {
      const imageName = await uploadAvatarService(req.files, req.userId);
      res.json({ image: imageName });
   }),

   deleteAvatar: expressAsyncHandler(async (req: IRequest<{ fileName: string }, any, any>, res: Response<{ message: string }>) => {
      await deleteAvatarService(req.userId, req.body);
      res.json({ message: "Success" });
   }),

};