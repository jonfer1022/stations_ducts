import { ParsedQs } from "qs";
import complianceAnnualIntegrityPlanModel from "../models/complianceAnnualIntegrityPlan.model";

class complianceAnnualIntegrityPlanController {

  static async getTableRiskAwarenessCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await complianceAnnualIntegrityPlanModel.getTableRiskAwarenessDB();

        let activitiesExecuted = 0, activitiesScheduled = 0, totalAdvance = 0;
        res.forEach((item:any) => {
          activitiesExecuted += item.inExecuting ? 1 : 0;
          activitiesScheduled += item.scheduled ? 1 : 0;
          totalAdvance += item.advance;
        });
        res.push({activitiesExecuted, activitiesScheduled, totalPercentage: totalAdvance / res.length})

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskAwarenessCont: ",error);
        reject(error);
      }
    })
  }

}

export default complianceAnnualIntegrityPlanController;