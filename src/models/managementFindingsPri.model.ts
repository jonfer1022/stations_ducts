import db from "../config/database";

class managementFindingsPriModel {

  static async getTableManagementFindingsPriDB(station_id: string | undefined): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            SUM(CAST(ie.NUMERADOR as FLOAT)) as "managedFindings",
            SUM(CAST(ie.DENOMINADOR as FLOAT)) as "totalFindings",
            ie.[Nivel de Riesgo] as "metrics",
            (SUM(CAST(ie.NUMERADOR as FLOAT)) / SUM(CAST(ie.DENOMINADOR as FLOAT))) * 100 as "percentage",
            e.Nombre as "stations"
          FROM Indicadores_Estaciones ie
          INNER JOIN Estaciones e on e.Estacion_ID = ie.Estacion_ID
          WHERE ie.[Nivel de Riesgo] LIKE 
            CASE WHEN ie.[Nivel de Riesgo] in ('Satisfactorio','Parcial') AND ie.[# Equipos_1] <> 0 THEN ie.[Nivel de Riesgo]
            WHEN ie.[Nivel de Riesgo] in ('Insuficiente') THEN ie.[Nivel de Riesgo] END
            AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
          GROUP BY ie.[Nivel de Riesgo] , e.Nombre
          ORDER BY e.Nombre ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableManagementFindingsPriDB: ",error);
        reject(error);
      }
    })
  }
}

export default managementFindingsPriModel;