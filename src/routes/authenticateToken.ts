/* eslint-disable consistent-return */
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, <string>config.access_token, (err, recipe) => {
    if (err) {
      return res.status(403).send({
        message: 'Unauthorized',
      });
    }
    // req.user = recipe;
    next();
  });
}
// module.exports = authenticateToken;
export default authenticateToken;
