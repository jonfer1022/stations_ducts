import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import managementIncorrectOpController from "../controllers/managementIncorrectOp.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableManagementIncorrectOp = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await managementIncorrectOpController.getTableManagementIncorrectOpCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableManagementIncorrectOp: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getTableManagementIncorrectOpGroupByDate = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await managementIncorrectOpController.getTableManagementIncorrectOpGroupByDateCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableManagementIncorrectOpGroupByDate: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableManagementIncorrectOp,
  getTableManagementIncorrectOpGroupByDate
}