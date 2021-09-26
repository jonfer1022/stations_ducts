import db from "../config/database";

class ilicitasBySectionModel {

  static async getTableIlicitasBySectionDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
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
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getilicitasBySectionDB: ",error);
        reject(error);
      }
    })
  }
  
 
      }



export default ilicitasBySectionModel;