const data = {
  villains: {
    data: [
      {
        id: 'VillainDawesSr',
        name: 'Mr. Dawes Sr.',
        description: 'I once knew a main with a wooden leg named Smith',
      },
      {
        id: 'VillainWilkins',
        name: 'Mr Wilkins',
        description: "What's up with these bank characters?",
      },
    ],
  },
};

const getRandomInt = () => {
  const max = 1000;
  const min = 100;
  return Math.floor(Math.random() * Math.floor(max) + min);
};

const addVillain = (villain) => {
  villain.id = getRandomInt();
  data.villains.push(villain);
  return villain;
};

const updateVillain = (villain) => {
  const index = data.villains.findIndex((v) => v.id === villain.id);
  console.log(villain);
  data.villains.splice(index, 1, villain);
  return villain;
};

const deleteVillain = (id) => {
  const value = parseInt(id, 10);
  data.villains = data.villains.filter((v) => v.id !== value);
  return true;
};

const getVillains = () => {
  return data.villains;
};

module.exports = { addVillain, updateVillain, deleteVillain, getVillains };
