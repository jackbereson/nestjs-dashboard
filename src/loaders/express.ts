import compression from "compression";
import cors from "cors";
import express from "express";
import path from "path";
import next from "next";

import { configs } from "../configs";

export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.set("port", configs.port);
  app.use(compression());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use("/public", express.static(path.join(__dirname, "../../public")));

  const nextApp = next({ dev: false, dir: "./next" });
  const handle = nextApp.getRequestHandler();
  nextApp.prepare().then(() => {
    console.log("Next App Initialized!");
    app.get("*", (req, res) => handle(req, res));
  });
};
