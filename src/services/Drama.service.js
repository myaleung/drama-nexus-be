import data from "../../data/data.json" with { type: "json" };
import cast from "../../data/cast.json" with { type: "json" };
import Actor from "../models/Actor.model.js";
import Drama from "../models/Drama.model.js";

export default class DramaService {
  getAllDramas = async () => {
    try {
      return await Drama.find({});
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getDrama = async (id) => {
    try {
      return await Drama.findById(id)
        .populate({
          path: 'cast',
          populate: {
            path: 'actor',
            model: 'Actor'
          }
        })
        .populate({
          path: 'reviews',
          populate: {
            path: 'author',
            model: 'UserProfile',
            populate: {
              path: 'user',
              model: 'User'
            }
          }
        })
        .populate({
          path: 'reviews',
          populate: {
            path: 'drama',
            model: 'Drama'
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  populateDramas = () => {
    try {
      //access api data document from initial generation seed (genData.js) No admin zone to access endpoint in MVP.
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  populateDramaDB = async (dramaDetails) => {
    try {
      return await Drama.insertMany(dramaDetails);
    } catch (e) {
      console.error("Error inserting dramas:", e.message);
      throw new Error(e.message);
    }
  };

  populateDramaCast = () => {
    try {
      //access api cast document from initial generation seed (genData.js) No admin zone to access endpoint in MVP.
      return cast;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  populateDramaCastDB = async (castDetails) => {
    try {
      return await Actor.insertMany(castDetails);
    } catch (e) {
      console.error("Error inserting dramas:", e.message);
      throw new Error(e.message);
    }
  }

  populateCastInDramaCollection = async (dramaId, castList) => {
    try {
      console.log(await Drama.findOne({ dramaId: dramaId }));
      if (cast.actor === "" || cast.actor === null || cast.role === "") { return; }
      return await Drama.updateOne({ dramaId: dramaId }, { $set: { cast: castList } }, { new: true });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  getActor = async (actorId) => {
    try {
      return await Actor.findOne({ actorId: actorId });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}