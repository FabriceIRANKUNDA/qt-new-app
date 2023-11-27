import bcrypt from 'bcrypt'
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const matchPassword = (givenPassword: string, actualPassword: string): boolean => {
  return bcrypt.compareSync(givenPassword, actualPassword)
}
