import user from "./user";
const initRouter = (app) => {
  app.use("/api/v1/user", user);
  return app.use("/", (req, res) => {
    return res.send("Server on...");
  });
};
export default initRouter;
