import axios from "axios";

// import { User } from "@/types/user";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  username: string;
  email: string;
  avatar: string;
}

export type LogoutResponse = {
  message?: string;
};

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const response = await nextServer.post<RegisterUserResponse>(
    "/auth/register",
    params
  );
  return response.data;
}

export async function login(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const response = await nextServer.post<RegisterUserResponse>(
    "/auth/login",
    params
  );
  return response.data;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await nextServer.post<LogoutResponse>("/auth/logout");
  return response.data;
}
