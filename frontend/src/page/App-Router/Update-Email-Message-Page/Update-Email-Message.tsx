import React, { FC } from "react";

import { Result } from "antd";
import {v4} from "uuid";

import style from "./Update-Email-Message.module.scss";

export const UpdateEmailMessagePage: FC = () => {

   return (
         <div className={ style.UpdateEmailMessagePage }>
            <Result
               className={ style.result }
               status="success"
               title="Лист із посиланням на підтведження вже летить на вказану електронну пошту"
               extra={ [ <button key={v4()}> Окей </button> ] }
            />
         </div>

   );
};
