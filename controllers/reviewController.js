const reviews = require("../models").reviews;
//no model-poi added yet
const router = require("../routes");

exports.findReview = async (req, res) => {
  try {
    let query = { where: {} };

    if (req.query.poiid != null) {
      query.where.poi_id = req.query.poiid;
    }
    const reviewsList = await reviews.findAll(query);
    if (reviewsList.length == 0) {
      return res.status(404).json({ error: "No Reviews Found" });
    } else {
      return res.json(reviewsList);
    }
  } catch (e) {
    return res.status(500).json({ error: error });
  }
};

exports.addReview = async (req, res) => {
  console.log(req.body);
  const { poi_id, review } = req.body;
  if (!poi_id || !review || review == "") {
    return res.status(400).send({ error: "Please insert all data" });
  }
  return reviews
    .create({
      poi_id: poi_id,
      review: review,
    })
    .then((review) => res.status(200).send(review))
    .catch((error) => res.status(400).send(error));
};

exports.reviewDetail = async (req, res) => {
  try {
    let review = await reviews.findByPk(Number(req.params.id));

    if (review) {
      return res.json(review);
    } else {
      return res.status(404).json({ error: "Not Found Review" });
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

exports.updateReview = async (req, res) => {
  try {
    let poiReview = await reviews.findByPk(Number(req.params.id));
    if (poiReview) {
      const { review } = req.body;
      let values = {};

      if (review != null) {
        values.review = review;
      }

      poiReview
        .update(values)
        .then((updatedReview) => {
          return res.status(200).json(updatedReview);
        })
        .catch((error) => {
          return res.status(500).json({ error: error });
        });
    } else {
      return res.status(404).json({ error: "Not Found Review" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    let review = await reviews.findByPk(Number(req.params.id));

    if (review) {
      //delete function
      if (review.destroy()) {
        return res.json("deleted");
      } else {
        return res.status(500).json({ error: "error deleting" });
      }
    } else {
      return res.status(404).json({ error: "Not Found Review" });
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
