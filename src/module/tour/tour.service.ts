import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  //   const result = await Tour.create(payload)

  const data = new Tour(payload)

  //   data.color = "red"

  const result = await data.save()
  return result
}

const getTours = async () => {
  const result = Tour.find()
  return result
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}

const getNextSchedule = async (id: string) => {
  const tour = await Tour.getNextNearestStartDateAndEndData()
  //   const nextSchedule = tour?.getNextNearestStartDateAndEndData()

  return {
    tour,
    // nextSchedule,
  }
}

export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
