const sql = require("./db.js");

// constructor
const Sportscenter = function(sportscenter) {
  this.coordinates = sportscenter.coordinates;
  this.name = sportscenter.name;
};

Sportscenter.create = (newsportscenter, result) => {
  sql.query("INSERT INTO sportscenters SET ?", newsportscenter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sportscenter: ", { id: res.insertId, ...newsportscenter });
    result(null, { id: res.insertId, ...newsportscenter });
  });
};

Sportscenter.findById = (sportscenterId, result) => {
  sql.query(`SELECT * FROM sportscenters WHERE id = ${sportscenterId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sportscenter: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found sportscenter with the id
    result({ kind: "not_found" }, null);
  });
};

Sportscenter.getAll = result => {
  sql.query("SELECT * FROM sportscenters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sportscenters: ", res);
    result(null, res);
  });
};

Sportscenter.updateById = (id, sportscenter, result) => {
  sql.query(
    "UPDATE sportscenters SET email = ?, name = ?, active = ? WHERE id = ?",
    [sportscenter.coordinates, sportscenter.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found sportscenter with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sportscenter: ", { id: id, ...sportscenter });
      result(null, { id: id, ...sportscenter });
    }
  );
};

Sportscenter.remove = (id, result) => {
  sql.query("DELETE FROM sportscenters WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found sportscenter with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sportscenter with id: ", id);
    result(null, res);
  });
};

Sportscenter.removeAll = result => {
  sql.query("DELETE FROM sportscenters", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sportscenters`);
    result(null, res);
  });
};

module.exports = Sportscenter;
