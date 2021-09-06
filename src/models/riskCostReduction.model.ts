import db from "../config/database";

class riskCostReductionModel {

  static async getTableAverageCostSeccionsDB(station_id: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            
          FROM "Avisos_Sin_Gestionar" asg
          INNER JOIN "Estaciones" e on e."Estacion_ID" = asg.[Centro planificación]
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
          ORDER BY e.Nombre ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableAverageCostSeccionsDB: ",error);
        reject(error);
      }
    })
  }

}

export default riskCostReductionModel;