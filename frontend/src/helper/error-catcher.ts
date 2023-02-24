import { type AxiosApiError } from "../service";

export const errorCatherFn = (e: unknown) => {
   const axiosError = e as AxiosApiError;
   const response = axiosError.response?.data.message as string;
   let message;

   switch (response) {
      case "Current password is not valid":
         message = "Невірно вказаний поточний пароль";
         break;

      case "User with this email is already exists":
         message = "Користувач з такою електронною поштою вже існує";
         break;

      case "Account is not activated":
         message = "Активуйте аккаунт";
         break;

      case "Invalid file type":
         message = "Невірний формат файлу";
         break;

      case "Wrong email or password":
         message = "Невірний пароль або електронна пошта";
         break;

      case "File size must be less than 3 mb":
         message = "Розмір файлу не має перевищувати 3МБ";
         break;

      case "Activation code is not valid":
         message = "Невірний код активації";
         break;

      case "User is not found":
         message = "Користувача з такою електронною поштою не існує";
         break;

      case "No such image or directory":
         message = "Непередбачена помилка.. Перезавантажте сторінку";
         break;

      case "Password is already in use":
         message = "Цей пароль вже використовується. Спробуйте інший";
         break;

      default:
         message = `${ axiosError.message }`;
         break;
   }

   console.log(response ? response : axiosError.message);

   return message;
};