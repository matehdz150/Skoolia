export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  role: 'public' | 'private'; //el rol publico son las cuentas de los padres, el rol privado el de las escuelas.
}

export interface CreateUserParams {
  email: string;
  passwordHash: string;
  role: 'public' | 'private';
}
