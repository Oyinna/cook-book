import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import User from '../database/dbfunctions/users';

function generateToken(user: any) { return jwt.sign(user.toJSON(), <string>config.access_token, { expiresIn: '1w' }); }

const UsersController = {
  // login user
  login: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      if (!req.body.username || !req.body.password) {
        return res.status(400).send({
          success: false,
          message: 'username or password can not be empty',
        });
      }
      const findUser = await User.findByUsername(<string>req.body.username);

      if (!findUser) {
        return res.status(400).send({
          success: false,
          message: 'Incorrect username or password',
        });
      }

      const confirmPassword = await bcrypt.compare(req.body.password, findUser.password);
      if (!confirmPassword) {
        return res.status(400).send({
          success: false,
          message: 'Incorrect username or password',
        });
      }

      const userDetails = {
        // eslint-disable-next-line no-underscore-dangle
        id: findUser._id,
        username: findUser.username,
      };

      const accessToken = generateToken(findUser);
      return res.status(200).send({
        accessToken,
        success: true,
        data: userDetails,
      });
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message || 'login failed.',
      });
    }
  },
};

export default UsersController;
