const fs = require('fs');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, value) => {
  console.log(`Received ID is ${value}`);
  if (value * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id Found ...',
    });
  }

  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name Or Price',
    });
  }

  next();
};

const getAllTours = (req, res) => {
  console.log('requestTime', req.requestTime);
  res.status(200).json({
    status: 'success',
    result: tours.length,
    reuestedAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  // to get hold of parameters in the specified url
  // can have any number of parameters /:id /:area/:pid etc
  // to  mark any parametr optional  /:id /:area?/:pid , use question mark

  const tour = tours.find((t) => t.id === req.params.id * 1);
  //  req.params.id * 1::: converts string into number

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  // res.send(req.body);
  const newId = Number(tours[tours.length - 1].id) + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  // update functionality will be written later on
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  checkID,
  checkBody,
};
