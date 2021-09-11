import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import attentionStaticAssestsController from "../controllers/attentionStaticAssests.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableNoticesManagedByStation = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await attentionStaticAssestsController.getTableNoticesManagedByStationCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableNoticesManagedByStation: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableNoticesManagedByStation
}