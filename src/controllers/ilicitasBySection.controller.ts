import { ParsedQs } from "qs";
import ilicitasBySectionModel from "../models/ilicitasBySection.model";

class ilicitasBySectionController {

  static async getIlicitasBySectionCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await ilicitasBySectionModel.getTableIlicitasBySectionDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableIlicitasBySectionCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default ilicitasBySectionController;