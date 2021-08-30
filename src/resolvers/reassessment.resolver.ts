import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import reassessmentController from "../controllers/reassessment.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableReassessment = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await reassessmentController.getTableReassessmentCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableReassessment: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableReassessment,
}