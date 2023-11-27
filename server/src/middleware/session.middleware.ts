import { Request, Response, NextFunction } from 'express'

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb: () => void) => {
      cb()
    }
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb: () => void) => {
      cb()
    }
  }
  next()
}
