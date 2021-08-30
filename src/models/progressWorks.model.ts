import db from "../config/database";

class progressWorksModel {

  static async getTableProgressWorksDB({ 
    variable1, 
    variable2 
  } : any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            o.Obras_id as "works_id",
            o.ROUTE_NAME as "works_name",
            o.[Tipo de Obra] as "types_works"
          FROM "obras" o
        `;
        const result =  await conn.query(query);
        // Faltan tablas para retornar los datos correctamente
        const res = {
          data: result.recordset,
          msg: "Hola mundo"
        }
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableProgressWorksDB: ",error);
        reject(error);
      }
    })
  }

}

export default progressWorksModel;