import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { APIS, CODEBREW_KA_URL, GHR_KA_URL, LIVE_URL } from "../services/routes";
import { getItem } from "../services/apiService";

const axiosInstance = axios.create({
  // baseURL: `http://${GHR_KA_URL}:3000`, // Specify your base URL here
  baseURL:LIVE_URL
});

axiosInstance.interceptors.request.use((config) => {
  // Add the Authorization header if a token is present
  const userData = getItem("userData");
  if (!!userData) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  return config;
});

export const useCustomQuery = <T>(url: APIS, query = "") =>
  useQuery<T>({
    queryKey: [url + query],
    queryFn: async () => {
      console.log(url,'api hittin')
      const response = await axiosInstance.get<T>(url + query);
      console.log(response,'api ress')
      return response.data;
    },
    retry: 3,
  });


export default useCustomQuery;
