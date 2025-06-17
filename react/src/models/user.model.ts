export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface UserRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: string;
}
