export interface AuthDetailsType {
  email: string;
  password: string;
}

export interface RoleContextType {
  role?: string | undefined;
  setRole?: React.Dispatch<React.SetStateAction<string | undefined>>;
}
