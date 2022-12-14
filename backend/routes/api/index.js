const router = require("express").Router();
const { restoreUser } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { router: spotRouter } = require("./spots.js");
const reviewRouter = require("./reviews.js");
const bookingRouter = require("./bookings.js");
const imageRouter = require("./spotImages.js");
const reviewImages = require("./reviewImages.js");
// const { route } = require("./bookings.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/spots", spotRouter);
router.use("/reviews", reviewRouter);
router.use("/bookings", bookingRouter);
router.use("/spot-images", imageRouter);
router.use("/review-images", reviewImages);

// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

module.exports = router;
