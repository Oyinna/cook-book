import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export class DbConnect {
  public static connect(MONGODB_URI: string) {
    return new Promise((resolve, reject) => {
      mongoose.connect(MONGODB_URI, (err, data: mongoose.ClientSession) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

// readFile('hello.txt')
// .then(data=>{
//     return data;
// })
// .then(data=>{
//     console.log(`${data} I'm Chinyelu and I love clen and maintainable code`)
// })
// .catch(err=>{
//     console.log(err)
// })
