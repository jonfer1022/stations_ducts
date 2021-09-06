import db from "../config/database";

class stationsModel {

  static async getFilterStationsDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            e.Estaciones_id as "station_id",
            e.Nombre as "station_name"
          FROM Estaciones e 
          ORDER BY e.Nombre ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterStationsDB: ",error);
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
            d.Ductos_id as "id",
            d.SEGMENTO as "duct_segments"
          FROM Ductos d 
          GROUP BY d.SEGMENTO, d.Ductos_id
          ORDER BY d.ROUTE_NAME ASC
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
            d.Ductos_id as "id",
            d.SECTOR as "duct_sector"
          FROM Ductos d 
          GROUP BY d.SECTOR, d.Ductos_id
          ORDER BY d.ROUTE_NAME ASC
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
            ked.EscenarioDesastre_id as "id",
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

export default stationsModel;