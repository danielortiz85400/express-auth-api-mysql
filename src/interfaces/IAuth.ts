export type roleType = "ADMINISTRADOR" | "USUARIO" | "MODERADOR";

export interface IRoles {
  ADMINISTRADOR: string;
  MODERADOR: string;
  USUARIO: string;
}

export const allowedRoles: IRoles = {
  ADMINISTRADOR: '["ADMINISTRADOR", "USUARIO"]',
  MODERADOR: '["ADMINISTRADOR", "USUARIO"]',
  USUARIO: '["USUARIO", "USUARIO"]'
}
export interface IUser {
  id?: null;
  dni: string;
  password?: string;
  userPassword?: string;
  userRole: roleType;
  permissions?: string;
  status?: boolean;
  token?: string;
}

export interface User {
  user: {
    id: string;
    dni: string;
    password: string;
    user_role: string;
    role_permissions: string;
    status: number;
  };
  jwt: {
    token: string;
    expiresIn: number;
  };
}


