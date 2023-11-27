import { CRUDHandler } from '../utils/helpers/CRUDHandler'
import { Task } from '../db/models/Tasks'

export class TaskController {
  static createTask = CRUDHandler.createOne(Task)
  static updateTask = CRUDHandler.updateOne(Task)
  static deleteTask = CRUDHandler.deleteOne(Task)
  static getTask = CRUDHandler.getOne(Task)
  static getAllTasks = CRUDHandler.getMany(Task)
}
