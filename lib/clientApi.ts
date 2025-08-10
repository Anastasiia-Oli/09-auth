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

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export async function registerUser(
  params: RegisterRequest
): Promise<RegisterUserResponse> {
  const response = await nextServer.post<RegisterUserResponse>(
    "/auth/sign-up",
    params
  );
  return response.data;
}
