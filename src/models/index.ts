import { ValidationException } from "@exceptions/index";
import mongoose, { ConnectOptions, Types } from "mongoose";
// Use mongoose with promises
mongoose.Promise = global.Promise;

export type MongoConnectionParams = {
  URL: string;
  USER: string;
  PASSWORD: string;
  DB: string;
};

export const connectToMongo = ({ URL, USER, PASSWORD, DB }: MongoConnectionParams) =>
  new Promise((resolve, reject) => {
    if ([URL, USER, PASSWORD, DB].some(d => !d))
      return reject("Check you mongo URL, USER and PASSWORD");

    const connectionOptions: ConnectOptions = {
      dbName: DB,
      user: USER,
      pass: PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose
      .connect(URL!, connectionOptions)
      .then(r => resolve("Connected to monogo"))
      .catch(e => reject("error" + e));

    // If for same reason later mongoose disconnect, thrown an error
    mongoose.connection.on("error", err => {
      console.error("MONGO HAS AN ERROR!");
      // throw new Error(err);
    });

    mongoose.connection.on("disconnected", err => {
      console.error("MONGO HAS DISCONNECTED!");
      // throw new Error(err);
    });

    mongoose.connection.on("reconnected", err => {
      console.error("MONGO HAS RECONNECTED!");
      // throw new Error(err);
    });

    mongoose.connection.on("close", err => {
      console.log("MONGO HAS BEEN CLOSED!");
      // throw new Error(err);
    });
  });

export const isValidMongoId = (id: string | number | Types.ObjectId) => {
  return mongoose.Types.ObjectId.isValid(id)
    ? null
    : new ValidationException(`Invalid mongo id: '${id}'`);
};

export const closeMongoConnection = () =>
  new Promise((res, rej) => {
    mongoose.connection
      .close()
      .then(r => res("Disconnected from monogo"))
      .catch(e => rej("error" + e));
  });
