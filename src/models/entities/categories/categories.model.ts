import { Model, model, Schema } from "mongoose";
import { ICategory } from "@models/entities/categories/categories.interfaces";
import { collectionName as ProductsCollectionName } from "@models/entities/products/products.model";

export const collectionName = "category";

const categoriesSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product", //ProductsCollectionName,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const categoriesModel: Model<ICategory> = model<ICategory>(
  collectionName,
  categoriesSchema
);
