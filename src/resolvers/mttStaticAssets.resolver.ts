import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import mttStaticAssetsController from "../controllers/mttStaticAssets.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableStaticEquipmentMaintenance = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await mttStaticAssetsController.getTableStaticEquipmentMaintenanceCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableStaticEquipmentMaintenance: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableStaticEquipmentMaintenance
}