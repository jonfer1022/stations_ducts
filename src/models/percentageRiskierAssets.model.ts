import db from "../config/database";

class percentageRiskierAssetsModel {

  static async getParetoPercentageRiskierAssetsDB(station_id: string | undefined): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            CAST(p.Riesgo_Acumulado as FLOAT) * 100 as "accumulatedRisk",
            CAST(p.Porcentaje as FLOAT) * 100 as "percentage",
            80 as "limitPareto"
          FROM pareto p
          INNER JOIN Estaciones e on e.Estacion_ID = p.Estacion_ID 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
          ORDER BY "percentage"
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getParetoPercentageRiskierAssetsDB: ",error);
        reject(error);
      }
    })
  }
  
}

export default percentageRiskierAssetsModel;