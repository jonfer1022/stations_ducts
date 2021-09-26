import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import ilicitasBySectionController from "../controllers/IlicitasBySection.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableIlicitasBySection = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ilicitasBySectionController.getIlicitasBySectionCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getIlicitasBySection: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableIlicitasBySection
}