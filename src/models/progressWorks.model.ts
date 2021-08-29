import db from "../config/database";

class progressWorksModel {

  static async getTableProgressWorksDB({ 
    variable1, 
    variable2 
  } : any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const result =  await conn.query(`SELECT GETDATE() as 'date_now'`);
        const res = {
          data: result.recordset[0].date_now,
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