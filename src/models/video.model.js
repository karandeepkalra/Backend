//In Mongoose, a plugin is a way to attach extra functionality 
// to your schema, and mongoose-aggregate-paginate-v2 is one such 
// plugin that adds pagination support specifically for aggregation queries;
//  by using videoSchema.plugin(mongooseAggregatePaginate),
//  you extend your model so it gains a new method like Video.aggregatePaginate(), 
// which allows you to fetch large datasets (like videos) in smaller chunks using 
// options such as page and limit, improving performance 
// and making data handling more efficient compared to loading everything at once.
import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema=newSchema({
    videoFile:{
        type:String,//cloudinary url
        required:true
    },
    thumbnail:{
        type:String,//cloudinary url
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number, //this is sent by cloudinary
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        refs:"User"
    }
},{
    timestamps:true
})
videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)