import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

class RogueSQL {
  async usersGET() {
    try {
      const query = "SELECT * FROM rogue_nx.user";
      const values = [];
      const [data] = await pool.execute(query, values);
      //console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  async userGET(id) {
    try {
      const query = "SELECT * FROM rogue_nx.user WHERE user_id=?";
      const values = [id];
      const [data] = await pool.execute(query, values);
      //console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  async userPOST(body) {
    try {
      const query = "INSERT INTO rogue_nx.user(user_type_id,first_name,last_name,email,password) VALUES ('3',?,?,?,?)";
      const values = [body.fr_name, body.las_name, body.email, body.password];
      const [data] = await pool.execute(query, values);
      //console.log(data);
      return { massage: "success" };
    } catch (error) {
      return { massage: error };
    }
  }

  async userPUT(id, body) {
    try {
      const query = "UPDATE rogue_nx.user SET user_type_id = 3,first_name = ?,last_name = ?,email = ?,password = ? WHERE user_id=?";
      const values = [body.fr_name, body.las_name, body.email, body.password, id];
      await pool.execute(query, values);
      console.log(`id, ${id.toString()}`);
      return { massage: "success" };
    } catch (error) {
      return { massage: error };
    }
  }
}

export default RogueSQL;
