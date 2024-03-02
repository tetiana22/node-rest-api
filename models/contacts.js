import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export const createContactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
export const updateContactSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});
export const favoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const Contact = model("contact", contactSchema);
