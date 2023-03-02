import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IEnvironmentVariables } from "../config/env-variables.interface";
import { IAccessTokenPair } from "../auth/interface";

@Injectable()
export class TokenService {

   constructor(
      private jwtService: JwtService,
      private configService: ConfigService<IEnvironmentVariables>,
   ) {
   }

   generatePair(payload: any): IAccessTokenPair {
      try {
         return {
            accessToken: this.jwtService.sign(payload, {
               secret: this.configService.get("accessToken"),
               expiresIn: "1d",
            }),
            refreshToken: this.jwtService.sign(payload, {
               secret: this.configService.get("refreshToken"),
               expiresIn: "7d",
            }),
         };

      } catch (e) {
         throw new HttpException("JWT: Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   generate(payload: any, secret: string): string {
      try {
         return this.jwtService.sign(payload, { secret, expiresIn: "1d" });
      } catch (e) {
         throw new HttpException("JWT: Error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   tokenVerify(token: string, secret: string): any {
      try {
         return this.jwtService.verify(token, { secret });
      } catch (e) {
         throw new HttpException("Invalid or expired token", HttpStatus.UNAUTHORIZED);
      }
   }


}
