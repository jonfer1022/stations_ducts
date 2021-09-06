import db from "../config/database";

class ductsModel {

  static async getFilterSectionsDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
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
  
  static async getFilterSegmentsDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.SEGMENTO as "duct_segments"
          FROM Ductos d 
          GROUP BY d.SEGMENTO
          ORDER BY d.SEGMENTO ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterSegmentsDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterSectorsDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.SECTOR as "duct_sector"
          FROM Ductos d 
          GROUP BY d.SECTOR
          ORDER BY d.SECTOR ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterSectorsDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterDisasterScenariosDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            ked.KRI5_EscenarioDesastre_id as "id",
            ked.Nombre as "name_scenario"
          FROM KRI5_EscenarioDesastre ked 
          ORDER BY ked.Nombre ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterDisasterScenariosDB: ",error);
        reject(error);
      }
    })
  }

}

export default ductsModel;