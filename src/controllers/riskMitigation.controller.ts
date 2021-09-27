import { ParsedQs } from "qs";
import riskMitigationModel from "../models/riskMitigation.model";

class riskMitigationController {

  static async getTableRiskMitigationCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res: Array<object> = await riskMitigationModel.getTableRiskMitigationContDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalValoration = 0, totalReValoration = 0;

        res.forEach((item:any) => {
          totalValoration += item.valoration;
          totalReValoration += item.reValoration;
        });
        
        res.push({ totalReValoration, percentageRiskMitigation: 100 - (totalReValoration/totalValoration) * 100 })

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskMitigationCont: ",error);
        reject(error);
      }
    })
  }

}

export default riskMitigationController;