import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Define a single Axios instance to be used
  const axiosInstance = axios.create({
    baseURL: 'https://api.flickr.com', // would normally use .env files
  });

  // Add interceptors for both request and response
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let controller = new AbortController();

  useEffect(() => {
    return () => controller?.abort();
  }, []);

  const fetchImages = async (page: number, text: string) => {
    setLoading(true);
    setError(false);
    controller.abort();
    controller = new AbortController();

    try {
      // Fetch data from flickr
      const response = await axiosInstance({
        url: '/services/rest/',
        method: 'GET',
        params: {
          method: 'flickr.photos.search',
          page,
          api_key: '6343a66eb46c461c91934e8a7a981056', // would normally store in .env
          text,
          format: 'json',
          nojsoncallback: 1,
          per_page: 50,
        },
        signal: controller.signal,
      });
      setLoading(false);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // if specific axios error
        console.error(error?.response?.data);
        setError(true);
      } else if (axios.isCancel(error)) {
        // prevent displaying error when request was aborted
        console.error('Request has been cancelled', error.message);
      } else {
        // handle non-Axios errors
        console.error(error?.message);
        setError(true);
      }
      setLoading(false);
      return {};
    }
  };

  return { error, loading, fetchImages };
};

export default useAxios;
