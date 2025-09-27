import mongoose, { Schema, model, models } from "mongoose";

export const VIDOE_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation: {
    height: number;
    width: number;
    quality?: number;
  };
}

const vidoeSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  controls: {
    type: Boolean,
    default: true,
  },
  transformation: {
    height: {
      type: Number,
      default: VIDOE_DIMENSIONS.height,
    },
    width: {
      type: Number,
      default: VIDOE_DIMENSIONS.width,
    },
    quality:{type:Number,min:1,max:100}
  },
},{timestamps:true  });

const Video = models?.Video || model<IVideo>("Video", vidoeSchema);

export default Video;
