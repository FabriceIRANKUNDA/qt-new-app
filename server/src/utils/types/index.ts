export interface IUser {
  phone: string
  password: string
  confirmPassword: string
  email: any
  names: String
  photo: String
  passwordResetToken: string
  passwordResetExpires: Date
  role: string
  isPasswordResetTokenVerified: boolean
}

export interface ITask {
  title: string
  description: string
  assignee: any
  dueDate: Date
  startDate: Date
  status: string
  priority: string
  files: string[]
  project: any
  userId: any
}

export interface IProject {
  name: string
}

export type OurModels = IUser | ITask
