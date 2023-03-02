import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { User, UserSchema } from "../user/model/user.model";
import { UserModule } from "../user/user.module";
import { UserRepository } from "../user/repository/user.repository";
import { ActionToken, ActionTokenSchema, OAuth, OAuthSchema } from "./model";
import { ActionTokenRepository, OAuthRepository } from "./repository";
import { AccessStrategy, LoginStrategy, RefreshStrategy } from "./strategy";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "../common/email.service";
import { TokenService } from "../common/token.service";


@Module({

   imports: [
      MongooseModule.forFeature([
         { name: User.name, schema: UserSchema },
         { name: OAuth.name, schema: OAuthSchema },
         { name: ActionToken.name, schema: ActionTokenSchema },
      ]),
      PassportModule,
      JwtModule.register({}),
      UserModule,
   ],

   controllers: [ AuthController ],

   providers: [
      ConfigService,
      AuthService,
      LoginStrategy,
      AccessStrategy,
      RefreshStrategy,
      EmailService,
      TokenService,
      UserRepository,
      OAuthRepository,
      ActionTokenRepository,
   ],
})
export class AuthModule {

}