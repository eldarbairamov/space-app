import React, { FC } from "react";

import { message, Result } from "antd";
import { v4 } from "uuid";
import logoutService from "../../../service/auth/logout.service";

import style from "./Update-Password-Message-Page.module.scss";
import { AppRouter } from "../../../router";

export const UpdatePasswordMessagePage: FC = () => {
   const [ messageApi, contextHolder ] = message.useMessage();

   const { logoutFn } = logoutService(messageApi, () => {
      AppRouter.navigate("/", { state: { status: "change password" }, replace: true });
      AppRouter.navigate(0);
   });

   return (
      <div className={ style.UpdatePasswordMessagePage }>
         { contextHolder }

         <Result
            className={ style.result }
            status="success"
            title="Ви успішно оновили свій пароль."
            subTitle="Будь ласка, виконайте вхід до аккаунту використовуючи оновленні дані."
            extra={ [ <button onClick={ logoutFn } key={ v4() }>Перейти </button> ] }
         />
      </div>
   );
};