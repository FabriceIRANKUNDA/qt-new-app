import { CRUDHandler } from '../utils/helpers/CRUDHandler'
import { Task } from '../db/models/Tasks'
import { NextFunction, Request, Response } from 'express'
import { User } from '../db/models/User'
import catchAsyncError from '../utils/helpers/catchAsyncError'
import exceljs from 'exceljs'
import pump from 'pump'
import { Stream } from 'stream'

export class TaskController {
  static createTask = CRUDHandler.createOne(Task)
  static updateTask = CRUDHandler.updateOne(Task)
  static deleteTask = CRUDHandler.deleteOne(Task)
  static getTask = CRUDHandler.getOne(Task)
  static getAllTasks = CRUDHandler.getMany(Task)

  static getTaskData = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const assignees = await User.find({ role: 'assignees' }).exec()

    return res.status(200).json({
      status: 'success',
      data: {
        projects: [
          { name: 'Project 1', id: assignees[0]?._id },
          { name: 'Project 2', id: assignees[1]?._id },
        ],
        assignees,
      },
    })
  })

  static exportData = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')
    console.log('exporting data')
    const data = await Task.find({}).exec()

    const columns = [
      { header: 'title', key: 'title', width: 20 },
      { header: 'description', key: 'description', width: 10 },
      { header: 'dueDate', key: 'dueDate', width: 30 },
      { header: 'startDate', key: 'startDate', width: 30 },
      { header: 'priority', key: 'priority', width: 30 },
      { header: 'project', key: 'project', width: 30 },
    ]

    worksheet.columns = columns
    worksheet.addRows(data)

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=exported-data.xlsx')

    // Stream the Excel file in chunks for efficiency
    const streamOptions = {
      sheetId: 'Sheet 1',
      filename: 'exported-data.xlsx',
      useStyles: true,
      useSharedStrings: true,
    }

    workbook.xlsx
      .write(res, streamOptions)
      .then(() => {
        res.end()
      })
      .catch((error) => {
        console.error('Error exporting Excel file:', error)
        res.status(500).send('Internal Server Error')
      })
  })

  static getTaskStats = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const data = await Task.aggregate([
      {
        $group: {
          _id: null,
          notDone: { $sum: { $cond: [{ $eq: ['$status', 'notdone'] }, 1, 0] } },
          done: { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
          lowPriority: { $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] } },
          highPriority: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
          normalPriority: { $sum: { $cond: [{ $eq: ['$priority', 'normal'] }, 1, 0] } },
        },
      },
    ])
    return res.status(200).json({
      status: 'success',
      data,
    })
  })
}
