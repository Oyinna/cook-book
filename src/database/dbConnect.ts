import mongoose from 'mongoose';
import {config} from '../config';

const dbconnection = async(url: string)=>{
  try{
    const connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    if(connection===mongoose){
      console.log('database connected')
    }else{
      console.log('database not connected')
    }
  }
  catch (err){
      console.log(err)
  }
}

dbconnection(<string>config.mogodb_url)
// export default dbconnection;
export {mongoose}