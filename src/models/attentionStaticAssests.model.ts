import db from "../config/database";

class attentionStaticAssestsModel {

  static async getTableNoticesManagedByStationDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            e.Nombre as "station",
            CAST(adaae.AVISOS_GESTIONADOS as FLOAT) as "noticesManagement",
            CAST(adaae.AVISOS_CREADOS as FLOAT) as "noticesCreated",
            CAST(adaae.AVISOS_CON_FECHA_FIN_DE_AVERÍA as FLOAT) as "noticesClosed",
            CAST(adaae.[_Avance] as FLOAT) * 100 as "advance",
            adaae.Metrica as "metrics"
          FROM Atencion_de_avisos_activos_estaticos adaae 
          INNER JOIN Estaciones e on e.Estacion_ID = adaae.ESTACIÓN 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          ORDER BY e.Nombre ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableNoticesManagedByStationDB: ",error);
        reject(error);
      }
    })
  }
  
}

export default attentionStaticAssestsModel;