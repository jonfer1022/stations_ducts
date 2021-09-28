import { ParsedQs } from "qs";
import riskCostReductionModel from "../models/riskCostReduction.model";

class riskCostReductionController {

  static async getTableAverageCostSeccionsCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res : Array<object> = await riskCostReductionModel.getTableAverageCostSeccionsDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalCostsHVH = 0, totalCosts = 0;
        res.forEach((item:any) => {
          totalCostsHVH += item.averageCostsHVH;
          totalCosts += item.averageCosts;
        });

        res.push({ percentageReducedCostRisk: ((totalCostsHVH)/(totalCosts)) * 100})

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableAverageCostSeccionsCont: ",error);
        reject(error);
      }
    })
  }

}

export default riskCostReductionController;