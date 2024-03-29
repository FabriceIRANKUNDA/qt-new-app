import { Router } from 'express'
import { TaskController, upload } from '../controllers/TaskController'
import { protectedRoutes } from '../middleware/authenticated'

const router = Router()
router.use(protectedRoutes)
router.get('/export', TaskController.exportData)
router.route('/').get(TaskController.getAllTasks).post(upload.array('files'), TaskController.createTask)
router.get('/data', TaskController.getTaskData)

router.get('/stats', TaskController.getTaskStats)
router.route('/:id').get(TaskController.getTask).patch(TaskController.updateTask).delete(TaskController.deleteTask)
export default router
