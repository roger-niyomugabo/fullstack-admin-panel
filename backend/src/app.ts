// import express from "express";
// import cors from "cors";
// import usersRouter from "./routes/users";
// import publicKeyRouter from "./routes/publicKey";

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// app.use("/api/users", usersRouter);
// app.use("/api/public-key", publicKeyRouter);

// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", message: "Server is running" });
// });

// app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import publicKeyRouter from "./routes/publicKey";

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/api/users", usersRouter);
  app.use("/api/public-key", publicKeyRouter);

  app.get("/api/health", (req, res) =>
    res.json({ status: "OK", message: "Server is running" })
  );

  app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

  return app;
};

// Only listen when not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3001;
  createApp().listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
