import db from "../config/database";

class riskLevelgModel {

  static async getTableRiskLevelContainersDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            SUM(CAST(ie.NUMERADOR as FLOAT)) as "numberEquipments",
            SUM(CAST(ie.DENOMINADOR as FLOAT)) as "totalEquipments",
            ((SUM(CAST(ie.NUMERADOR as FLOAT)))/(SUM(CAST(ie.DENOMINADOR as FLOAT)))) * 100 as "percentage",
            e.Nombre as "stations",
            ie.Métrica as "metrics",
            ie.[Nivel de Riesgo] as "riskLevel"
          FROM Indicadores_Estaciones ie
          INNER JOIN Estaciones e on e.Estacion_ID = ie.Estacion_ID
          WHERE ie.[Nivel de Riesgo] IN ('Bajo', 'Medio - Bajo', 'Intermedio', 'Alto', 'Muy Alto') AND ie.Infraestructura IN ('Recipientes')
            AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY ie.[Nivel de Riesgo], e.Nombre, ie.Métrica
          ORDER BY e.Nombre
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelContainersDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableRiskLevelTanksDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            SUM(CAST(ie.NUMERADOR as FLOAT)) as "numberEquipments",
            SUM(CAST(ie.DENOMINADOR as FLOAT)) as "totalEquipments",
            ((SUM(CAST(ie.NUMERADOR as FLOAT)))/(SUM(CAST(ie.DENOMINADOR as FLOAT)))) * 100 as "percentage",
            e.Nombre as "stations",
            ie.Métrica as "metrics",
            ie.[Nivel de Riesgo] as "riskLevel"
          FROM Indicadores_Estaciones ie
          INNER JOIN Estaciones e on e.Estacion_ID = ie.Estacion_ID
          WHERE ie.[Nivel de Riesgo] IN ('Bajo', 'Medio - Bajo', 'Intermedio', 'Alto', 'Muy Alto') AND ie.Infraestructura IN ('Tanques')
            AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY ie.[Nivel de Riesgo], e.Nombre, ie.Métrica
          ORDER BY e.Nombre
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelTanksDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableRiskLevelPipelinesDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            SUM(CAST(ie.NUMERADOR as FLOAT)) as "numberEquipments",
            SUM(CAST(ie.DENOMINADOR as FLOAT)) as "totalEquipments",
            ((SUM(CAST(ie.NUMERADOR as FLOAT)))/(SUM(CAST(ie.DENOMINADOR as FLOAT)))) * 100 as "percentage",
            e.Nombre as "stations",
            ie.Métrica as "metrics",
            ie.[Nivel de Riesgo] as "riskLevel"
          FROM Indicadores_Estaciones ie
          INNER JOIN Estaciones e on e.Estacion_ID = ie.Estacion_ID
          WHERE ie.[Nivel de Riesgo] IN ('Bajo', 'Medio - Bajo', 'Intermedio', 'Alto', 'Muy Alto') AND ie.Infraestructura IN ('Tuberias')
            AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY ie.[Nivel de Riesgo], e.Nombre, ie.Métrica
          ORDER BY e.Nombre
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelPipelinesDB: ",error);
        reject(error);
      }
    })
  }

}

export default riskLevelgModel;