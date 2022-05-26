const pointsofinterest = require("../models").pointsofinterest;
//no model-poi added yet
const router = require("../routes");

//look up poi in given region
//add new poi
//recommend a poi

exports.findPoi = async (req, res) => {
  try {
    let query = { where: {} };

    if (req.query.region != null) {
      query.where.region = req.query.region;
    }
    if (req.query.name != null) {
      query.where.name = req.query.name;
    }
    if (req.query.country != null) {
      query.where.country = req.query.country;
    }
    if (req.query.type != null) {
      query.where.type = req.query.type;
    }

    const places = await pointsofinterest.findAll(query);
    if (places.length == 0) {
      res.status(404).json({ error: "No Places Found" });
    } else {
      res.json(places);
    }
  } catch (e) {
    res.status(500).json({ error: error });
  }
};

exports.addPoi = async (req, res) => {
  console.log(req.body);
  const { name, type, country, region, lon, lat, description } = req.body;
  if (!name || !type || !country || !region || !lon || !lat || !description) {
    res.status(400).send({ error: "Please insert all data" });
  }
  return pointsofinterest
    .create({
      name: name,
      type: type,
      country: country,
      region: region,
      lon: lon,
      lat: lat,
      description: description,
    })
    .then((poi) => res.status(200).send(poi))
    .catch((error) => res.status(400).send(error));
};

exports.poiDetail = async (req, res) => {
  try {
    let poi = await pointsofinterest.findByPk(Number(req.params.id));

    if (poi) {
      res.json(poi);
    } else {
      res.status(404).json({ error: "Not Found POI" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.updatePoi = async (req, res) => {
  try {
    let poi = await pointsofinterest.findByPk(Number(req.params.id));
    if (poi) {
      console.log("updating");

      // Recommendation gets passed as true if it has been recommended.
      console.log(req.body);
      const {
        name,
        type,
        country,
        region,
        lon,
        lat,
        description,
        recommendations,
      } = req.body;
      let values = {};
      if (name != null) {
        values.name = name;
      }
      if (type != null) {
        values.type = type;
      }
      if (country != null) {
        values.country = country;
      }
      if (region != null) {
        values.region = region;
      }
      if (lon != null) {
        values.lon = lon;
      }
      if (lat != null) {
        values.lat = lat;
      }
      if (description != null) {
        values.description = description;
      }
      if (
        recommendations != null &&
        (recommendations == true || recommendations == "true")
      ) {
        values.recommendations = poi.recommendations + 1;
      }

      poi
        .update(values)
        .then((updatedPoi) => {
          res.status(200).json(updatedPoi);
        })
        .catch((error) => {
          res.status(400).json({ error: error });
        });
    } else {
      res.status(404).json({ error: "Not Found POI" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

exports.deletePoi = async (req, res) => {
  try {
    let poi = await pointsofinterest.findByPk(Number(req.params.id));

    if (poi) {
      //delete function
      if (poi.destroy()) {
        res.json("deleted");
      } else {
        res.status(400).json({ error: "error deleting" });
      }
    } else {
      res.status(404).json({ error: "Not Found POI" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
