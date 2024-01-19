import { Model } from 'mongoose'
import { OurModels } from '../types'
import catchAsyncError from './catchAsyncError'
import { NextFunction, Request, Response } from 'express'
import AppError from './AppError'
import httpStatus from 'http-status'
const APIfeatures = require('./APIfeatures')

export class CRUDHandler {
  static createOne = (Model: Model<OurModels>) =>
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
      if (Array.isArray(req.files)) {
        req.body.files = req.files.map((file: any) => file.filename)
      } else {
        req.body.files = []
      }
      const doc = await Model.create({ ...req.body, userId: req.authorUser.id })
      return res.status(201).json({
        status: 'success',
        message: 'Created successfully',
        data: doc,
      })
    })

  static updateOne = (Model: Model<OurModels>) =>
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!doc) {
        return next(new AppError(httpStatus.NOT_FOUND, 'No document found with that ID'))
      }

      return res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Updated successfully',
        data: doc,
      })
    })

  static deleteOne = (Model: Model<OurModels>) =>
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.findByIdAndDelete(req.params.id)

      if (!doc) {
        return next(new AppError(httpStatus.NOT_FOUND, 'No document found with that ID'))
      }

      return res.status(httpStatus.NO_CONTENT).json({
        status: 'success',
        message: 'Deleted successfully',
        data: null,
      })
    })

  static getOne = (Model: Model<OurModels>) =>
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.findById(req.params.id)

      if (!doc) {
        return next(new AppError(httpStatus.NOT_FOUND, 'No document found with that ID'))
      }

      return res.status(httpStatus.OK).json({
        status: 'success',
        data: doc,
      })
    })

  static getMany = (Model: Model<OurModels>) =>
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
      const features = new APIfeatures(Model.find({ userId: req.authorUser.id }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
      const count = await Model.find({ userId: req.authorUser.id }).countDocuments()
      const docs = await features.query

      if (!docs) {
        return next(new AppError(httpStatus.NOT_FOUND, 'No document found'))
      }

      return res.status(httpStatus.OK).json({
        status: 'success',
        data: docs,
        count,
      })
    })
}
