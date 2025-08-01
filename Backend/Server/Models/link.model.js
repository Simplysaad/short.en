import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    originalUrl: { type: String, required: true }, // needed
    shortLinkId: { type: String, unique: true, required: true }, // needed
    userId: { type: Schema.Types.ObjectId, ref: "user" }, // needed
    preferredText: { type: String }, // needed

    expiryDate: { type: Date }, // needed
    expiryClicks: { type: Number }, // needed
    tags: [{ type: String }], // needed

    expiryType: {
      type: String,
      enum: ["never", "expiryClicks", "expiryDate"],
      default: "never",
    }, // needed

    password: { type: String },

    clickCount: { type: Number, default: 0 },
    passwordProtected: { type: Boolean, default: false },
    geoTargeting: {
      enabled: { type: Boolean, default: false },
      locations: [{ type: String }],
    },
    deviceTargeting: {
      enabled: { type: Boolean, default: false },
      devices: [{ type: String }],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

linkSchema.virtual("shortLink").get(function () {
  return process.env.BASE_URL + (this.preferredText || this.shortLinkId)
});

const Link = model("link", linkSchema);
export default Link;
