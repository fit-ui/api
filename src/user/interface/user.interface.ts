export interface UserInterface {
  id: number;
  email: string;
  password: string;
  username: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}
