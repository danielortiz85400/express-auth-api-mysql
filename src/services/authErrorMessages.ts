/**
 * @param {null } err - Error devuelto por SignIn o SignUp (done fn).
 * @param { any } info - Error devuelto por fallo (extra de passport).
 * @returns {void} - Retorna err(SignIn o SignUp) o info(cambiando su  mensaje de error por defecto).
 */
export function errorMessages(err: null, info: any): void {
  const tokenSignatureValidation =
    typeof info === "object" ? { ...info } : null;

  return (
    err ??
    (tokenSignatureValidation.name === "JsonWebTokenError"
      ? (tokenSignatureValidation.message = "Sin autorización(Jwt)")
      : info)
  );
}
