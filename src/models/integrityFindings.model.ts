import db from "../config/database";

class integrityFindingsModel {

  static async getTableIntegrityFindingsDB(
    station_id: string | undefined,
    sector: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            hi.Grupo_del_hallazgo as "group",
            CASE WHEN hi1.group1 IS NOT NULL THEN hi1.group1 ELSE 0 END as "integrity",
            CASE WHEN hi2.group2 IS NOT NULL THEN hi2.group2 ELSE 0 END as "inspection",
            CASE WHEN hi3.group3 IS NOT NULL THEN hi3.group3 ELSE 0 END as "maintenance",
            CASE WHEN hi1.group1 IS NOT NULL THEN hi1.group1 ELSE 0 END +
            CASE WHEN hi2.group2 IS NOT NULL THEN hi2.group2 ELSE 0 END +
            CASE WHEN hi3.group3 IS NOT NULL THEN hi3.group3 ELSE 0 END as "total"
          FROM Hallazgos_Integridad hi
          LEFT JOIN (
            SELECT
              _hi1.Grupo_del_hallazgo as "_Grupo_del_hallazgo",
              COUNT(_hi1.Responsable_de_cierre) as "group1"
            FROM Hallazgos_Integridad _hi1
            INNER JOIN Estaciones e on e.Estacion_ID = _hi1.Estacion_ID 
            WHERE _hi1.Responsable = 'Integridad' 
              AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
              AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            GROUP BY _hi1.Grupo_del_hallazgo
          ) as hi1 ON hi1._Grupo_del_hallazgo = hi.Grupo_del_hallazgo
          LEFT JOIN (
            SELECT
              _hi2.Grupo_del_hallazgo as "_Grupo_del_hallazgo",
              COUNT(_hi2.Responsable_de_cierre) as "group2"
            FROM Hallazgos_Integridad _hi2
            INNER JOIN Estaciones e on e.Estacion_ID = _hi2.Estacion_ID 
            WHERE _hi2.Responsable = 'Inspección'
              AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
              AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            GROUP BY _hi2.Grupo_del_hallazgo
          ) as hi2 ON hi2._Grupo_del_hallazgo = hi.Grupo_del_hallazgo
          LEFT JOIN (
            SELECT
              _hi3.Grupo_del_hallazgo as "_Grupo_del_hallazgo",
              COUNT(_hi3.Responsable_de_cierre) as "group3"
            FROM Hallazgos_Integridad _hi3
            INNER JOIN Estaciones e on e.Estacion_ID = _hi3.Estacion_ID 
            WHERE _hi3.Responsable = 'Mantenimiento'
              AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
              AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            GROUP BY _hi3.Grupo_del_hallazgo
          ) as hi3 ON hi3._Grupo_del_hallazgo = hi.Grupo_del_hallazgo
          INNER JOIN Estaciones e on e.Estacion_ID = hi.Estacion_ID 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
          GROUP BY hi.Grupo_del_hallazgo, hi1.group1, hi2.group2, hi3.group3 
          ORDER BY hi.Grupo_del_hallazgo
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableIntegrityFindingsDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getFindigsClosedDB(
    station_id: string | undefined,
    sector: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            COUNT(hi.Estado_de_Atención) as "closeFindings"
          FROM Hallazgos_Integridad hi 
          INNER JOIN Estaciones e on e.Estacion_ID = hi.Estacion_ID 
          WHERE hi.Estado_de_Atención = 'Cerrado' 
            AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFindigsClosedsDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getPercentageFindigsClosedDB(
    station_id: string | undefined,
    sector: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            hi.Responsable_de_cierre as "responsibleClosing",
            CASE WHEN hi1.findingsClosed IS NULL THEN 0 ELSE hi1.findingsClosed END as "findingsClosed",
            COUNT(hi.Estacion_ID) as "countFindings"
          FROM Hallazgos_Integridad hi 
          INNER JOIN Estaciones e on e.Estacion_ID = hi.Estacion_ID
          LEFT JOIN (
            SELECT
              _hi1.Responsable_de_cierre as "responsibleClosing",
              COUNT(_hi1.Estacion_ID) as "findingsClosed"
            FROM Hallazgos_Integridad _hi1
            INNER JOIN Estaciones e on e.Estacion_ID = _hi1.Estacion_ID
            WHERE _hi1.Estado_de_Atención = 'Cerrado'
              AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
              AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            GROUP BY _hi1.Responsable_de_cierre
          ) as hi1 on hi1.responsibleClosing = hi.Responsable_de_cierre
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
          GROUP BY hi.Responsable_de_cierre, hi1.findingsClosed
          ORDER BY hi.Responsable_de_cierre
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getPercentageFindigsClosedDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getPercentageFindingsClosedByGroupDB(
    station_id: string | undefined,
    sector: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            hi.Grupo_del_hallazgo as "groupFindings",
            CASE WHEN hi1.findingsClosed IS NULL THEN 0 ELSE hi1.findingsClosed END as "findingsClosed",
            COUNT(hi.Estacion_ID) as "countfindings"
          FROM Hallazgos_Integridad hi 
          INNER JOIN Estaciones e on e.Estacion_ID = hi.Estacion_ID
          LEFT JOIN (
            SELECT
              _hi1.Grupo_del_hallazgo as "group",
              COUNT(_hi1.Estacion_ID) as "findingsClosed"
            FROM Hallazgos_Integridad _hi1
            INNER JOIN Estaciones e on e.Estacion_ID = _hi1.Estacion_ID
            WHERE _hi1.Estado_de_Atención = 'Cerrado'
              AND e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
              AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}   
            GROUP BY _hi1.Grupo_del_hallazgo
          ) as hi1 on hi1."group" = hi.Grupo_del_hallazgo
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
          GROUP BY hi.Grupo_del_hallazgo, hi1.findingsClosed
          ORDER BY hi.Grupo_del_hallazgo
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getPercentageFindingsClosedByGroupDB: ",error);
        reject(error);
      }
    })
  }

}

export default integrityFindingsModel;