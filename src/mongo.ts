import mongoose from 'mongoose';
import configObj from './config/mongo.json' assert { type: 'json' };
const env = process.env.NODE_ENV || 'development';
const config = configObj[env];
/*
mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    // @ts-expect-error
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });

mongoose.set('debug', env === 'development');
*/
export default mongoose;
