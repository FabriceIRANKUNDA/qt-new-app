export {}

declare module 'express-serve-static-core' {
  interface Request {
    authorUser?: {
      role: string
      id: string
      firstName: string
      lastName: String
      phone: String
      password: String
    }
  }
}
