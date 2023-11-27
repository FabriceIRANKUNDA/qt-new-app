export default class AppError extends Error {
  code: number
  status: string
  constructor(code: number, message: string) {
    super()
    this.code = code
    this.status = `${code}`.startsWith('4') ? 'fail' : 'error'
    this.message = message
  }
}
