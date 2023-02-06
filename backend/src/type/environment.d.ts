import { Secret } from "jsonwebtoken";
import fileUpload from "express-fileupload";
import { UserDocument } from "../model";

export {};

declare global {
   namespace NodeJS {
      interface ProcessEnv {
         PORT: number,
         MONGO_URI: string,
         API_URL: string,
         CLIENT_URL: string,
         EMAIL_SERVICE_USER: string,
         EMAIL_SERVICE_PASS: string
         SECRET_ACCESS_TOKEN_KEY: Secret,
         SECRET_REFRESH_TOKEN_KEY: Secret,
      }
   }
}

declare global {
   namespace Express {
      interface Request {
         user?: IUserDatabase;
         token?: string;
         userId?: UserDocument["id"];
         files?: fileUpload.FileArray | null | undefined;
      }
   }
}