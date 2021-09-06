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
  
}

export default stationsModel;