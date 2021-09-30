import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import mechanicalIntegrityManagementController from "../controllers/mechanicalIntegrityManagement.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableMechanicalIntegrityManagement = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await mechanicalIntegrityManagementController.getMechanicalIntegrityManagementCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getMechanicalIntegrityManagement: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableMechanicalIntegrityManagement}