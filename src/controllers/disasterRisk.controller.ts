import { ParsedQs } from "qs";
import disasterRiskModel from "../models/disasterRisk.model";

class disasterRiskController {

  static async getDisasterRiskCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await disasterRiskModel.getTableDisasterRiskDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalPercentage = 0;
        
        res.forEach((item:any) => {
          totalPercentage += item.riskDisaster;
        });

        res.push({totalPercentage})

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableDisasterRiskCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default disasterRiskController;