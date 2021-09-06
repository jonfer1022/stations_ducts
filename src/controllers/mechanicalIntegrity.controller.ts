import { ParsedQs } from "qs";
import mechanicalIntegrityModel from "../models/mechanicalIntegrity.model";

class mechanicalIntegrityController {

  static async getTableMechanicalIntegrityCont({ 
    station_id
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mechanicalIntegrityModel.getTableMechanicalIntegrityDB(station_id)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableMechanicalIntegrityCont: ",error);
        reject(error);
      }
    })
  }

}

export default mechanicalIntegrityController;