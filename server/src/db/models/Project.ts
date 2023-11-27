import mongoose from 'mongoose'
import { IProject } from '../../utils/types'

const projectSchema = new mongoose.Schema<IProject>(
  {
    name: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

export const Project = mongoose.model<IProject>('Project', projectSchema)
