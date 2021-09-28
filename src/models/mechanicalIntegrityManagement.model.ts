import db from "../config/database";

class mechanicalIntegrityManagementModel {

  static async getTableMechanicalIntegrityManagementDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            d.ROUTE_NAME,
            CASE WHEN kps1.corrosionPoints IS NOT NULL THEN kps1.corrosionPoints ELSE 0 END AS "corrosionPoints",
            CASE WHEN ki1.recordedLosses IS NOT NULL THEN ki1.recordedLosses ELSE 0 END AS "recordedLosses",
            CASE WHEN kss1.closedDents IS NOT NULL THEN kss1.closedDents ELSE 0 END AS "closedDents",
            CASE WHEN kdrs1.criticalDents IS NOT NULL THEN kdrs1.criticalDents ELSE 0 END AS "criticalDents",
            CASE WHEN kss2.movementAssisted IS NOT NULL THEN kss2.movementAssisted ELSE 0 END AS "movementAssisted",
            CASE WHEN ki2.criticalThresholdMovement IS NOT NULL THEN ki2.criticalThresholdMovement ELSE 0 END AS "criticalThresholdMovement",
            (CASE WHEN kps1.corrosionPoints IS NOT NULL THEN CAST(kps1.corrosionPoints AS FLOAT) ELSE 0 END + 
            CASE WHEN kss1.closedDents IS NOT NULL THEN CAST(kss1.closedDents AS FLOAT) ELSE 0 END + 
            CASE WHEN kss2.movementAssisted IS NOT NULL THEN CAST(kss2.movementAssisted AS FLOAT) ELSE 0 END) /
            (CASE WHEN ki1.recordedLosses IS NOT NULL THEN CAST(ki1.recordedLosses AS FLOAT) ELSE 0 END + 
            CASE WHEN kdrs1.criticalDents IS NOT NULL THEN CAST(kdrs1.criticalDents AS FLOAT) ELSE 0 END +
            CASE WHEN ki2.criticalThresholdMovement IS NOT NULL THEN CAST(ki2.criticalThresholdMovement AS FLOAT) ELSE 0 END) * 100 as "mechanicalIntegrityManagement"
          FROM Ductos d 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(kps.OBJECTID) as "corrosionPoints" 
            FROM KRI3_PICORROSION_SV kps 
            INNER JOIN Ductos d ON d.ROUTE_GUID = kps.ROUTE_GUID  
            WHERE kps.INSPECTION_DATE > kps.Date_Collected AND kps.Date_Collected <> ''
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as kps1 ON kps1.ROUTE_NAME = d.ROUTE_NAME 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(ki.OBJECTID) as "recordedLosses" 
            FROM KRI3_ILIDATA ki
            INNER JOIN Ductos d ON d.ROUTE_GUID = ki.ROUTE_GUID
            WHERE ki.MAX_DEPTH_PCT > 50
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as ki1 ON ki1.ROUTE_NAME = d.ROUTE_NAME
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(kss.OBJECTID) as "closedDents" 
            FROM KRI3_SLEEVE_SV kss 
            INNER JOIN Ductos d ON d.ROUTE_GUID = kss.ROUTE_GUID
            WHERE kss.KRI3_SLEEVE_SV_id IS NULL -- FALTA CAMPO POR CORREGIR!!!!
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as kss1 ON kss1.ROUTE_NAME = d.ROUTE_NAME 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(kdsr.Dent_Rev1ID) as "criticalDents" 
            FROM KRI3_Dent_Strain_Remaining kdsr 
            INNER JOIN Ductos d ON d.ROUTE_GUID = kdsr.RouteID 
            WHERE d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as kdrs1 ON kdrs1.ROUTE_NAME = d.ROUTE_NAME 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(kss.OBJECTID) as "movementAssisted" 
            FROM KRI3_SLEEVE_SV kss 
            INNER JOIN Ductos d ON d.ROUTE_GUID = kss.ROUTE_GUID
            WHERE kss.Inecialili <> ''
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as kss2 ON kss2.ROUTE_NAME = d.ROUTE_NAME 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              COUNT(ki.OBJECTID) as "criticalThresholdMovement" 
            FROM KRI3_Inercialili ki
            INNER JOIN Ductos d ON d.ROUTE_GUID = ki.ROUTE_GUID 
            WHERE d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as ki2 ON ki2.ROUTE_NAME = d.ROUTE_NAME 
          WHERE ki2.criticalThresholdMovement IS NOT NULL
            AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          ORDER BY d.ROUTE_NAME
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getMechanicalIntegrityManagementDB: ",error);
        reject(error);
      }
    })
  }
 
}

export default mechanicalIntegrityManagementModel;