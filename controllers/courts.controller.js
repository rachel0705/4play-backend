const courtsService = require("../services/courts.service");

function getCourts(req, res) {
  courtsService.getAllCourts((err, courts) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener canchas" });
    }
    res.json(courts);
  });
}

module.exports = {
  getCourts
};