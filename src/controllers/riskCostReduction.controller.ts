import { ParsedQs } from "qs";
import riskCostReductionModel from "../models/riskCostReduction.model";

class riskCostReductionController {

  static async getTableAverageCostSeccionsCont({ 
    station_id
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await riskCostReductionModel.getTableAverageCostSeccionsDB(station_id)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableAverageCostSeccionsCont: ",error);
        reject(error);
      }
    })
  }

}

export default riskCostReductionController;