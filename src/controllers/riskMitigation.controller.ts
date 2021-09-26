import { ParsedQs } from "qs";
import riskMitigationModel from "../models/riskMitigation.model";

class riskMitigationController {

  static async getTableRiskMitigationCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await riskMitigationModel.getTableRiskMitigationContDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskMitigationCont: ",error);
        reject(error);
      }
    })
  }

}

export default riskMitigationController;