import user from "../models/User.model.js";
import User from "../models/User.model.js";
import UserProfile from "../models/UserProfile.model.js";

export default class UserService {
  addUser = async (userDetails) => {
    try {
      const user = new User(userDetails);
      return await user.save();
    } catch (e) {
      throw new Error("Invalid User");
    }
  };

  createUserProfile = async (profileDetails) => {
    try {
      const profile = new UserProfile(profileDetails);
      return await profile.save();
    } catch (e) {
      throw new Error("Invalid Profile Data Provided");
    }
  };

  loginUser = async (body) => {
    try {
      const user = await User.findOne({ email: body.email });
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getUser = async (id) => {
    try {
      return await User.findById(id);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  getUserProfile = async (id) => {
    try {
      return await UserProfile.findOne({ user: id })
        .populate('user')
        .populate('watchlist')
        .populate({
          path: 'reviews',
          populate: {
            path: 'drama',
            model: 'Drama'
          }
        })
    } catch (e) {
      throw new Error(e.message);
    }
  };

  editUserDetails = async (updatedProperties, id) => {
    return await User.findOneAndUpdate({ _id: id }, updatedProperties, {
      new: true,
    });
  };

  editUserProfile = async (updatedProperties, id) => {
    return await UserProfile.findOneAndUpdate({ user: id }, updatedProperties, {
      new: true,
    });
  };

  getUserWatchList = async (id) => {
    try {
      return await UserProfile.findOne({ user: id }).select("watchList");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  checkIfInWatchlist = async (userId, dramaId) => {
    try {
      const user = await UserProfile.findOne({ user: userId });
      if (user) {
        const dramaInWatchlist = user.watchlist.some(
          (drama) => {
            return drama.toString() === dramaId;
          });
        return { userProfile: user, dramaInWatchlist: dramaInWatchlist };
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  addToWatchlist = async (userProfile, dramaId) => {
    try {
      userProfile.watchlist.push(dramaId);
      return await userProfile.save();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  removeFromWatchlist = async (userProfile, dramaId) => {
    try {
      const newWatchlist = userProfile.watchlist.filter((drama) => {
        return drama.toString() !== dramaId;
      });
      userProfile.watchlist = newWatchlist;
      return await userProfile.save();
    } catch (e) {
      throw new Error(e.message);
    }
  };
};