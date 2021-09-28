import { ParsedQs } from "qs";
import mechanicalIntegrityManagementModel from "../models/mechanicalIntegrityManagement.model";

class mechanicalIntegrityManagement {

  static async getMechanicalIntegrityManagementCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res: Array<object> = await mechanicalIntegrityManagementModel.getTableMechanicalIntegrityManagementDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalN = 0, totalD = 0;
        res.forEach((item:any) => {
          totalN += item.corrosionPoints + item.closedDents + item.movementAssisted;
          totalD += item.recordedLosses + item.criticalDents + item.criticalThresholdMovement;
        });

        res.push({ percentageMechanicalIntegrity: (totalN / totalD) * 100})

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMechanicalIntegrityManagementCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default mechanicalIntegrityManagement;