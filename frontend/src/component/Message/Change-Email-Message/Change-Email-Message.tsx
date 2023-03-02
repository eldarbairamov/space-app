import React from "react";

import { Result } from "antd";
import { v4 } from "uuid";
import { AppRouter } from "../../../router";
import { Button } from "../../../component";

import style from "./Change-Email-Message.module.scss";

export function ChangeEmailMessage() {

   return (
      <div className={ style.ChangeEmailMessage }>
         <Result
            className={ style.message }
            status="success"
            title="Ура!"
            subTitle={ "Лист із подальшою інструкцією вже летить на вказану електронну пошту" }
            extra={
               <Button key={ v4() } text={ "Окей" } onClick={ () => AppRouter.navigate("/") }/>
            }
         />
      </div>
   );
}