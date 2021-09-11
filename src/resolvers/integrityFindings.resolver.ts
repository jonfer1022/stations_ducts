import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import integrityFindingsController from "../controllers/integrityFindings.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableIntegrityFindings = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await integrityFindingsController.getTableIntegrityFindingsCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableIntegrityFindings: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFindigsClosed = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await integrityFindingsController.getFindigsClosedCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFindigsClosed: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getPercentageFindigsClosed = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await integrityFindingsController.getPercentageFindigsClosedCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getPercentageFindigsClosed: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getPercentageFindingsClosedByGroup = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await integrityFindingsController.getPercentageFindingsClosedByGroupCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getPercentageFindingsClosedByGroup: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableIntegrityFindings,
  getFindigsClosed,
  getPercentageFindigsClosed,
  getPercentageFindingsClosedByGroup
}