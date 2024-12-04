import { Router } from 'express'
import { tourController } from './tour.controller'

const tourRouter = Router()

tourRouter.get('/schedule/:id', tourController.getNextSchedule)
tourRouter.get('/:id', tourController.getSingleTour)
tourRouter.get('/', tourController.getTours)
tourRouter.post('/', tourController.createTour)
tourRouter.put('/:id', tourController.updateTour)
tourRouter.delete('/:id', tourController.deleteTour)

export default tourRouter
