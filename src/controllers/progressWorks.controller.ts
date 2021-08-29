import { ParsedQs } from "qs";
import progressWorksModel from "../models/progressWorks.model";

class progressWorksController {

  static async getTableProgressWorksCont({ 
    variable1, 
    variable2 
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await progressWorksModel.getTableProgressWorksDB("vari")
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableProgressWorksCont: ",error);
        reject(error);
      }
    })
  }

}

export default progressWorksController;