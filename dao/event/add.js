// Submodule imports
const Event = require("../../model/event");
const WRONG_OBJECT = require("../../constants/error_messages");

const conn = require('../../conn/mysql_conn_handler');

module.exports.addEvent = (event)=>{
  return new Promise((resolve, reject)=>{
    if (!event instanceof Event){
      reject(WRONG_OBJECT)
    }

    const query = "INSERT INTO `event`(`e_uid`, `e_brides_name`, `e_grooms_name`, `e_number_of_guests`, `e_location`, `e_date_of_reception`,`e_time_of_reception`) VALUES (?,?,?,?,?,?,?)"
    conn.query(query, [
      event.uid,
      event.brides_name,
      event.grooms_name,
      event.number_of_guests,
      event.location,
      event.date_of_reception,
      event.time_of_reception
    ], (err, res)=>{
      if (err){
        reject(err)
      }else{
        event.id = res.insertId
        resolve(event)
      }
    })
  })
}
