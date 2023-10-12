import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = (await import(configPath))[env];
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
