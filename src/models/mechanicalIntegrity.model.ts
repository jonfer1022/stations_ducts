import db from "../config/database";

class mechanicalIntegrityModel {

  static async getTableMechanicalIntegrityDB(station_id: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.ROUTE_NAME as "ducts_name",
            COUNT(ki.OBJECTID) as "criticalThresholdMovement",
            ki2."_count" as "recordedLosses",
            kps."_count" as "corrosionPoints",
            kss."_count"as "criticalDentsClosed",
            kss1."_count" as "pipeMovement"
            -- FALTA UNA COLUMNA MÁS!!!
          FROM Ductos d 
          INNER JOIN KRI3_Inercialili ki on ki.ROUTE_GUID = d.ROUTE_GUID
          LEFT JOIN ( 
            SELECT
            _ki2.ROUTE_GUID,
            COUNT(_ki2.OBJECTID) as "_count"
            FROM KRI3_ILIDATA _ki2
            GROUP BY _ki2.ROUTE_GUID
          ) as ki2 on ki2.ROUTE_GUID = d.ROUTE_GUID
          LEFT JOIN (
            SELECT 
            _kps.ROUTE_GUID,
            COUNT(_kps.OBJECTID) as "_count"
            FROM KRI3_PICORROSION_SV _kps 
            WHERE _kps.INSPECTION_DATE > _kps.Date_Collected AND _kps.Date_Collected IS NOT NULL AND _kps.Date_Collected NOT IN (N'')
            GROUP BY _kps.ROUTE_GUID
          ) as kps on kps.ROUTE_GUID = d.ROUTE_GUID
          LEFT JOIN (
            SELECT 
            _kss.ROUTE_GUID,
            COUNT(_kss.OBJECTID) as "_count"
            FROM KRI3_SLEEVE_SV _kss 
            WHERE _kss.KRI3_SLEEVE_SV_id IS NULL
            --_kss."SLEEVE_SV" NOT IN (N'') ----> Falta campo en la tabla!!
            GROUP BY _kss.ROUTE_GUID
          ) as kss on kss.ROUTE_GUID = d.ROUTE_GUID
          LEFT JOIN (
            SELECT 
            _kss1.ROUTE_GUID,
            COUNT(_kss1.OBJECTID) as "_count"
            FROM KRI3_SLEEVE_SV _kss1 
            WHERE _kss1."Inecialili" NOT IN (N'')
            GROUP BY _kss1.ROUTE_GUID
          ) as kss1 on kss1.ROUTE_GUID = d.ROUTE_GUID
          GROUP BY d.ROUTE_NAME, ki2."_count", kps."_count", kss."_count", kss1."_count"
          ORDER BY d.ROUTE_NAME ASC       
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableMechanicalIntegrityDB: ",error);
        reject(error);
      }
    })
  }

}

export default mechanicalIntegrityModel;