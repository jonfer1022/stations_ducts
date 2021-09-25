import { ParsedQs } from "qs";
import noticesManagementModel from "../models/noticesManagement.model";

class noticesManagementController {

  static async getTableNoticesManagementCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await noticesManagementModel.getTableNoticesManagementDB();

        let totalNoticesClosedM1M2M3 = 0, totalNoticesWithoutClosedM1M2M3 = 0;
        let totalNoticesClosedM4 = 0, totalNoticesWithoutClosedM4 = 0;
        res.forEach((item:any) => {
          if(['M1','M2','M3'].includes(item.claseNotice)) {
            totalNoticesClosedM1M2M3 += item.noticesClosed;
            totalNoticesWithoutClosedM1M2M3 += item.totalNoticesCreated;
          } else {
            totalNoticesClosedM4 += item.noticesClosed;
            totalNoticesWithoutClosedM4 += item.totalNoticesCreated;
          }
        });
        res.push({totalPercentage: ((totalNoticesClosedM1M2M3)/(totalNoticesWithoutClosedM1M2M3))*100 + ((totalNoticesClosedM4)/(totalNoticesWithoutClosedM4))*100 })

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableNoticesManagementCont: ",error);
        reject(error);
      }
    })
  }

}

export default noticesManagementController;