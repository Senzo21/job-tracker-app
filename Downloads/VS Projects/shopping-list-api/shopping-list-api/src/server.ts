import express, { Request, Response } from "express";
import cors from "cors";
import itemsRouter from "./routes/items";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      message: "Shopping List API running",
      endpoints: {
        list: "GET /items",
        get: "GET /items/:id",
        create: "POST /items",
        update: "PUT /items/:id",
        delete: "DELETE /items/:id"
      }
    }
  });
});

// Items routes
app.use("/items", itemsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: "Route not found" } });
});

// Central error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Shopping List API listening at http://localhost:${PORT}`);
});
