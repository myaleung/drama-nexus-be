import Config from "./src/db/db.config.js";
import Database from "./src/db/db.connection.js";
import DramaRoutes from "./src/routes/Drama.routes.js";
import Router from "./src/routes/Router.routes.js";
import ReviewRoutes from "./src/routes/Review.routes.js";
import UserRoutes from "./src/routes/User.routes.js";
import Server from "./src/server/Server.js";

Config.load();
const { PORT, HOST, DB_URI, ALLOWED_ORIGIN } = process.env;

const router = new Router();
const dramaRoutes = new DramaRoutes(ALLOWED_ORIGIN);
const reviewRoutes = new ReviewRoutes(ALLOWED_ORIGIN);
const userRoutes = new UserRoutes(ALLOWED_ORIGIN);
router.addRouter(dramaRoutes);
router.addRouter(reviewRoutes);
router.addRouter(userRoutes);
const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
await database.connect();
