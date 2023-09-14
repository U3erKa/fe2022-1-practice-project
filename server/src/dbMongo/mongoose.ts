import mongoose from 'mongoose';
import path from 'path';
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = require(configPath)[env];
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
