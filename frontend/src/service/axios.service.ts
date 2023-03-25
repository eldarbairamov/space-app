import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { authRequests, configuration } from "@src/config/configuration";
import { storageService } from "./storage.service";
import { AuthorizedRouter, UnauthorizedRouter } from "@src/router";
import { IOAuth } from "@src/interface";
import { pleaseWait } from "@src/helper";

export type AxiosApiError = AxiosError<{ message: string, status: number }>

export const axiosInstance = axios.create({ baseURL: configuration.API_URL });

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
   const accessToken = storageService.getAccessToken();

   if (accessToken) {
      config.headers = {
         "Authorization": `Bearer ${ accessToken }`,
      };
   }

   return config;
});

axiosInstance.interceptors.response.use((config: AxiosResponse) => {
      return config;
   },
   async (e) => {
      const axiosError = e as AxiosApiError;
      const refreshToken = storageService.getRefreshToken();
      const originalRequest = e.config;

      if (axiosError.response?.status === 401 && refreshToken && !originalRequest._isRetry) {
         originalRequest._isRetry = true;

         try {
            const { data } = await axiosInstance.post<Omit<IOAuth, "username">>(authRequests.refresh, { refreshToken });
            storageService.setTokens(data.accessToken, data.refreshToken);

         } catch (e) {
            storageService.deleteTokens();
            await pleaseWait(1000);
            UnauthorizedRouter.navigate("/unauthorized");
            // UnauthorizedRouter.navigate(0);
         }

         return axiosInstance(originalRequest);
      }

      if (axiosError.response?.status === 401 && axiosError.response?.data.message === 'Token invalid or expired') {
         AuthorizedRouter.navigate('/unauthorized')
      }

      return Promise.reject(e);
   });
