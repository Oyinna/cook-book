import mongoose from 'mongoose';

const dbconnection = async(url: string)=>{
  try{
    const connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    if(connection===mongoose){
      console.log('database connected')
    }else{
      console.log('database not connected')
    }
  }
  catch{
      console.log('database not connected')
  }
}

export {dbconnection};