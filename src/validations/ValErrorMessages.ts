export const errorValidation = {
    signIn: {
      dni: {
        'string.empty': 'dni requerido',
        'any.required': 'dni requerido'
      },
      userPassword: {
        'string.empty': 'Contraseña requerida',
        'any.required': 'Contraseña requerida'
      }
    },
    signup: {
      dni: {
        'string.empty': 'dni requerido',
        'any.required': 'dni requerido'
      },
      password: {
        'string.empty': 'Contraseña requerida',
        'any.required': 'Contraseña requerida'
      },
      confirmPassword: {
        'string.empty': 'Confirmación requerida',
        'any.required': 'Confirmación requerida',
        'any.only': 'Confirmación no coincide'
      },
      userRole: {
        'string.empty': 'Rol es requerido',
        'any.required': 'Rol es requerido',
        'any.only': 'Rol requerido'
      }
    }
  }

  