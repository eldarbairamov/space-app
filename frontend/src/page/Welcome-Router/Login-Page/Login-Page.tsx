import React from "react";

import { LoginForm, WelcomeLogo } from "../../../component";
import { useMatchMedia } from "../../../hook";
import { message } from "antd";
import { WelcomeRouter } from "../../../router";
import { loginService } from "../../../service";

import style from "./Login-Page.module.scss";

export function LoginPage() {
   const { isDesktop, isTablet } = useMatchMedia();

   const [ messageApi, contextHolder ] = message.useMessage();

   const { loginFn } = loginService(messageApi, () => WelcomeRouter.navigate(0));

   return (
      <div className={ style.LoginPage }>
         { contextHolder }

         {/*{ (isDesktop || isTablet) && <WelcomeLogo/> }*/}

         <WelcomeLogo/>

         <LoginForm loginFn={ loginFn }/>

      </div>
   );
}
