import mongoose from 'mongoose';
import {config} from '../config';

const dbconnection = async()=>{
  try{
    let connection
    if(config.environment_check === 'test'){
      console.log('test database connected ')
      connection = await mongoose.connect(<string>config.test_mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
      console.log('test database connected 2')
    }else{
      console.log('App database connected 1')
      connection = await mongoose.connect(<string>config.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('App database connected 2')
    }
    // console.log(`${connection} database connected`)
  }
  catch (err){
      console.log(`${err} database not connected`)
  }
}

dbconnection()
// export default dbconnection;
export {mongoose}