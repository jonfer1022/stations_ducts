import db from "../config/database";

class ductsModel {

  static async getFilterSectionsDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            d.Ductos_id as "id",
            d.ROUTE_NAME as "ducts_name"
          FROM Ductos d 
          ORDER BY d.ROUTE_NAME ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterSectionsDB: ",error);
        reject(error);
      }
    })
  }

}

export default ductsModel;