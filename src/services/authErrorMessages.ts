export function errorMessages(err: Error | null, info: any) {
  const tokenSignatureValidation =
    typeof info === "object" ? JSON.parse(JSON.stringify(info)) : null;
  return (
    err ??
    (tokenSignatureValidation[0].name === "JsonWebTokenError"
      ? (tokenSignatureValidation.message = "Sin autorización")
      : info)
  );
}
