import db from "../config/database";

class managementIncorrectOpModel {

  static async getTableManagementIncorrectOpDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
  ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.ROUTE_NAME as "ducts_name",
            (SELECT
              COUNT(_keo.XID) as "total_amount"
            FROM [KRI6_Eventos Operativos] _keo) as "amount_total",
            COUNT(keo.XID) as "amount_events",
            ( CAST(COUNT(keo.XID) as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_events",
            keo1.amout_event1,
            ( CAST(keo1.amout_event1 as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_event1",
            keo2.amout_event2,
            ( CAST(keo2.amout_event2 as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_event2",
            keo3.amout_event3,
            ( CAST(keo3.amout_event3 as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_event3",
            keo4.amout_eventMAOP,
            ( CAST(keo4.amout_eventMAOP as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_eventMAOP",
            keo5.amout_eventAVS,
            ( CAST(keo5.amout_eventAVS as FLOAT) / CAST((
              SELECT
              COUNT(_keo.XID) as "total_amount"
              FROM [KRI6_Eventos Operativos] _keo
            ) as FLOAT)) * 100 as "percentage_eventAVS"
          FROM [KRI6_Eventos Operativos] keo 
          INNER JOIN Ductos d on d.ROUTE_GUID = keo.RouteGUID
          LEFT JOIN (
            SELECT
              COUNT(_keo1.XID) as "amout_event1",
              d1.ROUTE_NAME as "ducts_name"
            FROM [KRI6_Eventos Operativos] _keo1
            INNER JOIN Ductos d1 on d1.ROUTE_GUID = _keo1.RouteGUID
            WHERE _keo1.Evento = 'Evento 1'
            GROUP BY d1.ROUTE_NAME
          ) as keo1 on keo1.ducts_name = d.ROUTE_NAME
          LEFT JOIN (
            SELECT
              COUNT(_keo2.XID) as "amout_event2",
              d2.ROUTE_NAME as "ducts_name"
            FROM [KRI6_Eventos Operativos] _keo2
            INNER JOIN Ductos d2 on d2.ROUTE_GUID = _keo2.RouteGUID
            WHERE _keo2.Evento = 'Evento 2'
            GROUP BY d2.ROUTE_NAME
          ) as keo2 on keo2.ducts_name = d.ROUTE_NAME
          LEFT JOIN (
            SELECT
              COUNT(_keo3.XID) as "amout_event3",
              d3.ROUTE_NAME as "ducts_name"
            FROM [KRI6_Eventos Operativos] _keo3
            INNER JOIN Ductos d3 on d3.ROUTE_GUID = _keo3.RouteGUID
            WHERE _keo3.Evento = 'Evento 3'
            GROUP BY d3.ROUTE_NAME
          ) as keo3 on keo3.ducts_name = d.ROUTE_NAME
          LEFT JOIN (
            SELECT
              COUNT(_keo4.XID) as "amout_eventMAOP",
              d4.ROUTE_NAME as "ducts_name"
            FROM [KRI6_Eventos Operativos] _keo4
            INNER JOIN Ductos d4 on d4.ROUTE_GUID = _keo4.RouteGUID
            WHERE _keo4.Evento = 'Supera MAOP'
            GROUP BY d4.ROUTE_NAME
          ) as keo4 on keo4.ducts_name = d.ROUTE_NAME
          LEFT JOIN (
            SELECT
              COUNT(_keo5.XID) as "amout_eventAVS",
              d5.ROUTE_NAME as "ducts_name"
            FROM [KRI6_Eventos Operativos] _keo5
            INNER JOIN Ductos d5 on d5.ROUTE_GUID = _keo5.RouteGUID
            WHERE _keo5.Evento = 'Activación Valvula Seguridad'
            GROUP BY d5.ROUTE_NAME
          ) as keo5 on keo5.ducts_name = d.ROUTE_NAME
          WHERE d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"} 
          GROUP BY d.ROUTE_NAME, keo1.amout_event1, keo2.amout_event2, keo3.amout_event3, keo4.amout_eventMAOP, keo5.amout_eventAVS
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableManagementIncorrectOpDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableManagementIncorrectOpGroupByDateDB(section_name: any, date: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            keo.XID as "xid",
            COUNT(keo.XID) as "amount_xid",
            keo.Fecha as "date",
            keo.Empresa as "company",
            keo.Evento as "event",
            keo."Sección" as "section"
          FROM [KRI6_Eventos Operativos] keo
          WHERE keo."Sección" ${section_name ? `= '${section_name}'`: "IS NOT NULL"} 
            AND keo.Fecha ${date ? `= '${date}'`: "IS NOT NULL"} 
          GROUP BY keo.XID, keo.Fecha, keo.Empresa, keo.Evento, keo."Sección"
          ORDER BY keo.Evento ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableManagementIncorrectOpGroupByDateDB: ",error);
        reject(error);
      }
    })
  }

}

export default managementIncorrectOpModel;