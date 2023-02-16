import React, { FC } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi/dist/joi";
import { emailValidator } from "../../../validator/auth.validator";
import { FormControl } from "../../UI/Form-Control/Form-Control";

import style from "./Forgot-Password-Form.module.scss";

interface IForgotPasswordFormProps {
   forgotPasswordFn: (email: string) => Promise<void>
}

export const ForgotPasswordForm: FC<IForgotPasswordFormProps> = ({forgotPasswordFn}) => {
   const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
      resolver: joiResolver(emailValidator),
      mode: "onTouched",
   });

   const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => forgotPasswordFn(email);

   return (
      <form className={ style.ForgotPasswordForm } onSubmit={ handleSubmit(onSubmit) }>

         {/* Message  */ }
         <p className={ style.message }>
            Введіть адресу електронної пошти вашого аккаунту і ми пришлемо вам посилання на скидання пароля.
         </p>

         {/* Form control */ }
         <FormControl
            labelName={ "" }
            fieldName={ "email" }
            register={ register }
            errorMessage={ errors.email?.message }
            isPassword={ false }
         />

         {/* Submit button */ }
         <button disabled={ !isValid }> Надіслати</button>

      </form>
   );
};