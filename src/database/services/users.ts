import MUser, { User } from '../models/users';

const UserClass = {
  findByUsername: async (username: string) => {
    const user = await MUser.findOne({ username });
    if (!user) {
      return false;
    }
    return user;
  },
};

export default UserClass;
