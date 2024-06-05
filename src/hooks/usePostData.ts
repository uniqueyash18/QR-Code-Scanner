import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
// import api from '';
import axios, { AxiosResponse } from "axios";
import { CODEBREW_KA_URL, GHR_KA_URL, LIVE_URL } from "../services/routes";
import { getItem } from "../services/apiService";

const axiosInstance = axios.create({
  // baseURL: `http://${GHR_KA_URL}:3000`, // Specify your base URL here
  baseURL:LIVE_URL
});

axiosInstance.interceptors.request.use((config) => {
  // Create a new object based on config
  const modifiedConfig = { ...config };

  // Add the Authorization header if a token is present
  const userData = getItem("userData");
  if (userData) {
    modifiedConfig.headers.Authorization = `Bearer ${userData.token}`;
  }

  return modifiedConfig;
});
axiosInstance.interceptors.request.use((config) => {
  // console.log('Final Request URL:', `http://${GHR_KA_URL}:3000${config.url}`);
  console.log('Final Request URL:', `${LIVE_URL}${config.url}`);
  console.log('Request Data:', config.data);
  console.log('Request Headers:', config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error ,

    // data outside of 2XX will go into the error->response object so handle all your error in here.
    if (error?.response?.status === 401) {
      console.log(error,'error in post api')
      return Promise.reject(error?.response?.data?.message || error?.response?.data?.error || "Unauthorized");
    }

    return Promise.reject(error?.response?.data?.message);
  },
);

interface MutationData {}
/**
 * A custom hook that abstracts the useMutation hook for different API endpoints.
 *
 * @param url - The API endpoint to hit.
 * @param options - Additional options for the mutation.
 * @returns - The result of the useMutation hook.
 */
const usePostData = <TData, TError, TVariables = MutationData, TContext = unknown>(
  url: string,
  options?: UseMutationOptions<AxiosResponse<TData>, TError, TVariables, TContext>,
): UseMutationResult<AxiosResponse<TData>, TError, TVariables, TContext> => {
  const result = useMutation<AxiosResponse<TData>, TError, TVariables, TContext>({
    ...options,
    mutationFn: (variables: TVariables) => axiosInstance.post<TData>(url, variables),
  });
  return result;
};

export default usePostData;
