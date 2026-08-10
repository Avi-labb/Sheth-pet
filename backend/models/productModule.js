import mongoose from "mongoose";
import Counter from "./counterModel.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      unique: true,
    },

    category: String,

    productType: String,

    color: {
      type: [String],
      default: [],
    },

    moqPackaging: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    capType: {
      type:String,
      default:'individual'
    },

    usage: String,

    keySpecs: String, // Keep for backward compatibility

    image: String, // For backward compatibility
    
    images: {
      type: mongoose.Schema.Types.Mixed,
      default: {}, // { color: filename }
    },

    showInPopup: {
      type: Boolean,
      default: false,
    },

    marketSegments: {
      type: [String],
      default: [],
    },

    volume: String,
    neckSize: String,
    weight: String,
    
    // New Key Logistic fields
    neckProfile: {
      type: [String],
      default: [],
    },
    ofc: String, // For Bottles/Jars
    height: String,
    diameter: String, // For Bottles/Jars
    pilfer: String, // For Caps
    length: String, // For Preforms

    // Color-specific specifications: { [colorName]: { volume, neckSize, weight, neckProfile, ofc, height, diameter, pilfer, length, capType, usage, keySpecs } }
    colorSpecs: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Handle backward compatibility for color, moqPackaging, and neckProfile fields
productSchema.pre("save", async function () {
  try {
    // Convert color from string to array if needed
    if (typeof this.color === 'string' && this.color) {
      this.color = [this.color];
    } else if (!Array.isArray(this.color)) {
      this.color = [];
    }

    // Convert moqPackaging from string to object if needed
    if (typeof this.moqPackaging === 'string' && this.moqPackaging) {
      this.moqPackaging = { default: this.moqPackaging };
    } else if (typeof this.moqPackaging !== 'object' || this.moqPackaging === null) {
      this.moqPackaging = {};
    }

    // Convert neckProfile from string to array if needed
    if (typeof this.neckProfile === 'string' && this.neckProfile) {
      this.neckProfile = [this.neckProfile];
    } else if (!Array.isArray(this.neckProfile)) {
      this.neckProfile = [];
    }

    // Ensure colorSpecs is an object
    if (typeof this.colorSpecs !== 'object' || this.colorSpecs === null) {
      this.colorSpecs = {};
    }

    // Generate SKU if needed
    if (this.isNew && !this.sku) {
      const counter = await Counter.findOneAndUpdate(
        { name: "productSku" },
        { $inc: { sequence: 1 } },
        {
          returnDocument: "after",
          upsert: true,
        }
      );

      this.sku = `SKU-${String(counter.sequence).padStart(4, "0")}`;
    }
  } catch (error) {
    throw error;
  }
});

// Handle backward compatibility for update operations too!
productSchema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function () {
  try {
    const update = this.getUpdate();

    // Handle color field in updates
    if (update.color !== undefined) {
      if (typeof update.color === 'string' && update.color) {
        update.color = [update.color];
      } else if (!Array.isArray(update.color)) {
        update.color = [];
      }
    }

    // Handle moqPackaging field in updates
    if (update.moqPackaging !== undefined) {
      if (typeof update.moqPackaging === 'string' && update.moqPackaging) {
        update.moqPackaging = { default: update.moqPackaging };
      } else if (typeof update.moqPackaging !== 'object' || update.moqPackaging === null) {
        update.moqPackaging = {};
      }
    }

    // Handle neckProfile field in updates
    if (update.neckProfile !== undefined) {
      if (typeof update.neckProfile === 'string' && update.neckProfile) {
        update.neckProfile = [update.neckProfile];
      } else if (!Array.isArray(update.neckProfile)) {
        update.neckProfile = [];
      }
    }

    // Handle colorSpecs field in updates
    if (update.colorSpecs !== undefined) {
      if (typeof update.colorSpecs === 'string' && update.colorSpecs) {
        try {
          update.colorSpecs = JSON.parse(update.colorSpecs);
        } catch {
          update.colorSpecs = {};
        }
      }
      if (typeof update.colorSpecs !== 'object' || update.colorSpecs === null) {
        update.colorSpecs = {};
      }
    }
  } catch (error) {
    throw error;
  }
});

export default mongoose.model("Product", productSchema);