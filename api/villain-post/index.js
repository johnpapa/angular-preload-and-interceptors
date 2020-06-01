const data = require('../shared/villain-data');

module.exports = async function (context, req) {
  const villain = {
    id: undefined,
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const newVillain = data.addHero(villain);
    context.res.status(201).json(newVillain);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
