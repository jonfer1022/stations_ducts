import { ParsedQs } from "qs";
import managementIncorrectOpModel from "../models/managementIncorretOp.model";

class managementIncorrectOpController {

  static async getTableManagementIncorrectOpCont({ 
    ducts_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await managementIncorrectOpModel.getTableManagementIncorrectOpDB(
          ducts_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableManagementIncorrectOpCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableManagementIncorrectOpGroupByDateCont({ 
    section_name,
    date
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await managementIncorrectOpModel.getTableManagementIncorrectOpGroupByDateDB(section_name, date)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableManagementIncorrectOpGroupByDateCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default managementIncorrectOpController;