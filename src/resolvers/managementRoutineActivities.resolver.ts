import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import managementRoutineActivitiesController from "../controllers/managementRoutineActivities.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getDataManagementRoutineActivities = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await managementRoutineActivitiesController.getDataManagementRoutineActivitiesCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getDataManagementRoutineActivities: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getDataManagementRoutineActivities
}