import { ParsedQs } from "qs";
import reassessmentModel from "../models/reassessment.model";

class reassessmentController {

  static async getTableReassessmentCont({ 
    ducs_id
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await reassessmentModel.getTableReassessmentDB(ducs_id)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableReassessmentCont: ",error);
        reject(error);
      }
    })
  }

}

export default reassessmentController;