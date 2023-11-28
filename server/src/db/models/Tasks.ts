import mongoose from 'mongoose'
import { ITask } from '../../utils/types'

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: String,
    description: String,
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: Date,
    startDate: Date,
    status: { type: String, default: 'notdone' },
    priority: String,
    files: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

export const Task = mongoose.model<ITask>('Task', taskSchema)
