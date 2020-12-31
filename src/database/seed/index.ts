// import 'dotenv/config';
import bcrypt from 'bcrypt';

import MUser, { User } from '../models/users';
import RecipesM, {Recipes} from '../models/recipes';

const password = bcrypt.hashSync('okay', 10);
const users = [
  {
    username: 'admin',
    password,
  },
  {
    username: 'Chinyelu',
    password,
  },
];

const recipes = [
  {
    name: 'Chicken Nuggets',
    prepTime: new Date(),
    difficulty: 1,
    vegetarian: true,
  },
  {
    name: 'Chicken Nuggets',
    prepTime: new Date(),
    difficulty: 1,
    vegetarian: false,
  },
  {
    name: 'Jollof Rice',
    prepTime: new Date(),
    difficulty: 2,
    vegetarian: false,
  },
  {
    name: 'Meat pie',
    prepTime: new Date(),
    difficulty: 3,
    vegetarian: false,
  },
  {
    name: 'Vegetable soup',
    prepTime: new Date(),
    difficulty: 1,
    vegetarian: true,
  },
];

const seed = async () => {
  try {
    console.log('Seeding started...');
    const user1 = await MUser.create(<User>users[0]);
    const user2 = await MUser.create(<User>users[1]);
    const recipe1 = await RecipesM.create(<Recipes>recipes[0]);
    const recipe2 = await RecipesM.create(<Recipes>recipes[1]);
    const recipe3 = await RecipesM.create(<Recipes>recipes[2]);
    const recipe4 = await RecipesM.create(<Recipes>recipes[3]);
    const recipe5 = await RecipesM.create(<Recipes>recipes[4]);
    if (user1 || user2 || recipe1 || recipe2 || recipe3 || recipe4 || recipe5) {
      return 'Seeded successfully';
    }
    return 'Seeded Unsuccessfully';
  } catch (error) {
    return console.log(error);
  }
};

const rollback = async () => {
  console.log('Starting seed rollback...');
  const username = users.map((a) => a.username);
  await MUser.deleteMany({ username: { $in: username } });
  return 'Seeding rolled back successfully';
};

const isRollback = process.argv[2] === '--rollback';
if (isRollback) rollback().then(console.log).catch(console.log).finally(() => process.exit(0));
else seed().then(console.log).catch(console.log).finally(() => process.exit(0));
