import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Either, Left, Right } from "ts-matches";

const apiUrl: string = process.env.REACT_API_URL || '';

const get = async <T, Err = any>(url: string, config: AxiosRequestConfig = {}): Promise<Either<AxiosError<Err>, T>> => {
  try {
    const { data } = await axios.get(url, config);
    return Right.of(data);
  } catch (error) {
    return Left.of(error)
  }
};

const post = async <V, T, Err = any>(url: string, data: V, config: AxiosRequestConfig = {}): Promise<Either<AxiosError<Err>, T>> => {
  try {
    const { response } = await axios.post(url, data, config);
    return Right.of(response);
  } catch (error) {
    return Left.of(error);
  }
};

const securedGet = async (apiKey: string, url: string, config?: AxiosRequestConfig) => {
  return get(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    ...config
  });
};

const securedPost = async <T>(apiKey: string, url: string, data: T, config?: AxiosRequestConfig) => {
  return post(url, data,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
      ...config
    });
};

export { get, post, securedGet, securedPost }
