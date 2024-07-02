import drama from "../models/Drama.model.js";
import DramaService from "../services/Drama.service.js";

export default class DramaController {
  #service;

  constructor(service = new DramaService()) {
    this.#service = service;
  }

  getAllDramas = async (req, res) => {
    try {
      const dramas = await this.#service.getAllDramas();
      if (!dramas) throw new Error("Dramas not found");
      return res.status(200).json({ dramas });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  getDrama = async (req, res) => {
    try {
      const drama = await this.#service.getDrama(req.params.id);
      if (!drama) throw new Error("Drama not found");
      return res.status(200).json({ drama });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  populateDramaDB = async (req, res) => {
    try {
      const dramas = await this.#service.populateDramas();
      if (!dramas) throw new Error("Dramas not found");
      let list = [];
      dramas.data.forEach((result) => {
        result.results.forEach((drama) => {
          if (drama.id === "" || drama.name === "" || drama.first_air_date === undefined || drama.first_air_date === "" || drama.first_air_date === null || drama.backdrop_path === "" || drama.backdrop_path === null || drama.poster_path === "" || drama.poster_path === null || drama.genre_ids === "") {
            return;
          }
          const date = parseInt(drama.first_air_date.split("-")[0]);
          list.push({ dramaId: drama.id, title: drama.name, year: date, voteAverage: drama.vote_average, voteCount: drama.vote_count, image: drama.backdrop_path, poster: drama.poster_path, synopsis: drama.overview, genreIds: drama.genre_ids });
        });
      });

      const populated = await this.#service.populateDramaDB(list);
      return res.status(200).json({ populated });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  populateCastDB = async (req, res) => {
    // populate actor collection
    try {
      const cast = await this.#service.populateDramaCast();
      if (!cast) throw new Error("Cast data not found");

      let castList = [];
      cast.data.forEach((result) => {
        result.cast.forEach((actor) => {
          if (actor.id === "" || actor.name === "" || actor.character === "") {
            return;
          }
          castList.push({ actorId: actor.id, name: actor.name, image: actor.profile_path });
        });
      });
      await this.#service.populateDramaCastDB(castList);
      return res.status(200).json({ status: 200, message: "Populated cast data" });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  populateDramaCastInDB = async (req, res) => {
    try {
      // loop over dramas
      // for each dramaID, add cast (updateOne) which matches cast.json dramaID
      // const dramas = await this.#service.getAllDramas();
      // if (!dramas) throw new Error("Drama data not found");

      const castData = await this.#service.populateDramaCast();
      if (!castData) throw new Error("Cast data not found");

      // for (const drama of dramas) {
      // const dramaCast = castData.data.find((item) => {
      //   return item.id === drama.dramaId
      // });
      // console.log(dramaCast);
      // if (!dramaCast || dramaCast === undefined) {
      //   console.log(`Drama ID ${drama.dramaId} not found in cast data`);
      //   continue;
      // }
      // }

      for (const dramaInfo of castData.data) {
        const dramaId = dramaInfo.id;
        let castList = [];
        for (const castMember of dramaInfo.cast) {
          let castItem = {
            actor: "",
            role: "",
          };
          // query mongodb actors where actorId = castMember.id
          const actor = await this.#service.getActor(castMember.id);
          console.log(actor);
          if (actor !== null && actor !== undefined) { // if actor exists, update castItem
            castItem.actor = actor._id;
            castItem.role = castMember.character;
            castList.push(castItem);
          }
        }
        await this.#service.populateCastInDramaCollection(dramaId, castList);
      };
      return res.status(200).json({ status: 200, message: "Populated cast in drama collection" });
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  };

  //? Method for admin users to add new dramas to the database which hasn't been implemented yet
  // addDrama = async (req, res) => {
  //   try {
  //     const drama = await this.#service.addDrama(req.body);
  //     if (!drama) throw new Error("Drama not created");
  //     return res.status(201).json({ drama });
  //   } catch (e) {
  //     return res.status(500).json({ status: 500, message: e.message });
  //   }
  // };
}