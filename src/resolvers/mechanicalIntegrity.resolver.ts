import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import mechanicalIntegrityController from "../controllers/mechanicalIntegrity.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableMechanicalIntegrity = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await mechanicalIntegrityController.getTableMechanicalIntegrityCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableMechanicalIntegrity: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableMechanicalIntegrity
}