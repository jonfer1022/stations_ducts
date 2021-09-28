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
        const res = await mechanicalIntegrityManagementModel.getTableMechanicalIntegrityManagementDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMechanicalIntegrityManagementCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default mechanicalIntegrityManagement;