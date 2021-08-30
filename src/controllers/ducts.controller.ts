import { ParsedQs } from "qs";
import ductsModel from "../models/ducts.model";

class ductsController {

  static async getFilterSectionsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await ductsModel.getFilterSectionsDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterSectionsCont: ",error);
        reject(error);
      }
    })
  }

}

export default ductsController;