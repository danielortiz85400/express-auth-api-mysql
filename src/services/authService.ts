import { authToken } from "@/envConfig";
import { createJwt } from "@/utils/creatorJwt";
import { encryptPassword } from "@/utils/hashPassword";
import { IUser, IRoles, allowedRoles } from "@/interfaces/IAuth";

// Servicio signup
export const authService = ({ dni, userPassword, userRole }: IUser): IUser => {
  const password = encryptPassword(<string>userPassword);
  const { token } = createJwt(dni, authToken.token);
  const { [userRole]: permissions } = allowedRoles;
  return {
    id: null,
    dni,
    password,
    userRole,
    permissions,
    status: false,
    token,
  };
};
