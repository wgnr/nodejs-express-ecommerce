export const collectionName = "option";
import { model, Schema, Model } from "mongoose";
import { IOptions, IOptionValue } from "@models/entities/options/options.interface";

const optionsValuesSchema = new Schema<IOptionValue>({
  value: {
    type: String,
    require: true,
  },
});

const OptionsSchema = new Schema<IOptions>(
  {
    name: { type: String, require: true, unique: true },
    values: [optionsValuesSchema],
  },
  {
    versionKey: false,
  }
);

export const OptionsModel: Model<IOptions> = model<IOptions>(
  collectionName,
  OptionsSchema
);
