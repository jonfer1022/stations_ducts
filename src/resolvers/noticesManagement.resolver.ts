import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import noticesManagementController from "../controllers/noticesManagement.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableNoticesManagement = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await noticesManagementController.getTableNoticesManagementCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableNoticesManagement: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableNoticesManagement,
}