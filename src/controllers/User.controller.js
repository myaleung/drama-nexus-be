import UserService from "../services/User.service.js";
import Jwt from "../middleware/Jwt.authenticator.js";
import BcryptHash from "../middleware/Bcrypt.hash.js";

export default class UserController {
  #service;

  constructor(service = new UserService()) {
    this.#service = service;
  }

  getUser = async (req, res) => {
    try {
      const user = await this.#service.getUser(req.params.id);
      if (!user) throw new Error("User not found");
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  addUser = async (req, res) => {
    const invalidError = new Error("Please enter all fields");
    const hashedPassword = await BcryptHash.hash(req.body.password);
    try {
      if (!req.body) throw invalidError;

      const userDetails = {
        name: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
        email: req.body.email,
        password: hashedPassword,
      };

      const newUser = await this.#service.addUser(userDetails);
      if (!newUser._id) throw new Error("Unable to create user");
      await this.createUserProfile(newUser);
      return res.status(201).json({
        message: "User registered",
        newUser
      });
    } catch (e) {
      if (e.message === invalidError.message) {
        return res.status(400).json({ status: 400, message: e.message });
      }
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  createUserProfile = async (user) => {
    try {
      const profileDetails = {
        user: user._id,
      };
      const newUserProfile = await this.#service.createUserProfile(profileDetails);
      if (!newUserProfile._id) throw new Error("Unable to create profile");
      return newUserProfile;
    } catch (e) {
      return e.message;
    }
  };

  loginUser = async (req, res) => {
    const invalidError = new Error("Please enter all fields");
    try {
      if (!req.body) throw invalidError;

      const user = await this.#service.loginUser(req.body);
      if (!user) throw new Error("Invalid login credentials");
      try {
        const isSamePass = await BcryptHash.verify(req.body.password, user.password);
        if (!isSamePass) {
          res.status(401).send("Invalid password");
          return;
        }
      } catch (error) {
        console.error("Error during authentication", error);
        res.status(500).send("An error occurred during authentication");
      }
      const token = Jwt.generateToken(user._id);

      return res.status(200).json({
        id: user.id,
        message: "User logged in",
        token,
      });
    } catch (e) {
      if (e.message === invalidError.message) {
        return res.status(400).json({ status: 400, message: e.message });
      }
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  getUserProfile = async (req, res) => {
    try {
      const userProfile = await this.#service.getUserProfile(req.params.id);
      if (!userProfile) throw new Error("User profile not found");
      return res.status(200).json({ userProfile });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  editUserProfile = async (req, res) => {
    const invalidError = new Error("Please enter all fields");
    try {
      if (!req.body) throw invalidError;
      let userDetails = {
        id: req.params.id,
        oldPassword: req.body.oldPassword,
      };

      let user = await this.#service.getUser(userDetails.id);
      if (!user) throw new Error("Cannot find user");
      try {
        const isSamePass = await BcryptHash.verify(userDetails.oldPassword, user.password);
        if (!isSamePass) {
          res.status(401).send("Sorry, you've provided an invalid password. Please try again.");
          return;
        }
        const checkNewToOldPass = await BcryptHash.verify(req.body.newPassword, user.password);
        if (checkNewToOldPass) {
          res.status(401).send("Please provide a new password that is different from a previous password.");
          return;
        }
      } catch (error) {
        console.error("Error during authentication", error);
        res.status(500).send("An error occurred during authentication");
      }
      const hashNewPassword = await BcryptHash.hash(req.body.newPassword);
      let newProfileDetails = {};
      if (req.body.newPassword) user.password = hashNewPassword;
      if (req.body.firstName) {
        user.name.firstName = req.body.firstName;
      }
      if (req.body.lastName) {
        user.name.lastName = req.body.lastName
      };
      if (req.body.profilePicture) newProfileDetails.profilePicture = req.body.profilePicture;
      if (req.body.bio) newProfileDetails.bio = req.body.bio;

      const updatedUserDetails = await this.#service.editUserDetails(
        user,
        userDetails.id
      );
      const updatedUserProfile = await this.#service.editUserProfile(
        { $set: newProfileDetails },
        userDetails.id
      );
      if (!updatedUserDetails) throw new Error("Unable to update unknown user");
      if (!updatedUserProfile) throw new Error("Unable to update unknown profile");
      return res.status(200).json({
        updatedUserDetails,
        updatedUserProfile,
        message: "User profile updated",
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };

  getUserWatchlist = async (req, res) => {
    try {
      const userProfile = await this.#service.getUserWatchList(req.params.id);
      if (!userProfile) throw new Error("User profile not found");
      return res.status(200).json({ watchlist: userProfile.watchlist });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  updateUserWatchlist = async (req, res) => {
    const { dramaId } = req.body;
    try {
      //check the drama exists in user's watchlist
      const checkInWatchlistResponse = await this.#service.checkIfInWatchlist(
        req.user.id, dramaId
      );

      if (checkInWatchlistResponse.dramaInWatchlist) {
        //remove drama from user's watchlist
        const userWatchlist = await this.#service.removeFromWatchlist(
          checkInWatchlistResponse.userProfile, dramaId
        );
        if (userWatchlist)
          return res.status(200).json({ message: "Drama removed from watchlist" });
      } else {
        //go to service to add drama to user's watchlist
        const userWatchlist = await this.#service.addToWatchlist(
          checkInWatchlistResponse.userProfile, dramaId
        );
        if (userWatchlist)
          return res.status(200).json({ message: "Drama added to watchlist" });
      }
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
}