

export interface Registro {
  nombre: string,
  correo: string,
  password: string,
  check: boolean
}


export interface Login {

  email: string,
  password: string
}


export interface ChangePassword {

  email: string,
  password: string,
  newPassword: string
}
