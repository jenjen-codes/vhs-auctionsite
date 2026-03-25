import express from "express";
import http from "http";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";
import auctionRouter from "./routes/auctions.route";
import { getOrCreateAuctionRoom, placeBidInRoom } from "./realtime/auctionRooms";
/* import cors from 'cors'; */

const app = express();
const server = http.createServer(app);

app.use(express.json());

// --------------------------------------------------------------------------
// SWAGGER:
// --------------------------------------------------------------------------

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My auction API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.ts"], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/", auctionRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinAuction", async (auctionId: string) => {
    const room = await getOrCreateAuctionRoom(auctionId);

    if (!room) {
      socket.emit("bidRefused", {
        auctionId,
        reason: "Auction does not exist.",
      });
      return;
    }

    const roomName = `auction:${auctionId}`;
    await socket.join(roomName);
    socket.emit("bidUpdated", {
      auctionId,
      currentPrice: room.currentPrice,
      minprice: room.minprice,
      bids: room.bids,
    });
  });

  socket.on(
    "placeBid",
    async (payload: { auctionId: string; bidder: string; amount: number }) => {
      const room = await getOrCreateAuctionRoom(payload.auctionId);

      if (!room) {
        socket.emit("bidRefused", {
          auctionId: payload.auctionId,
          reason: "Auction does not exist.",
        });
        return;
      }

      const result = placeBidInRoom(room, payload.bidder, Number(payload.amount));

      if (!result.ok) {
        socket.emit("bidRefused", {
          auctionId: payload.auctionId,
          reason: result.reason,
          currentPrice: room.currentPrice,
        });
        return;
      }

      io.to(`auction:${payload.auctionId}`).emit("bidUpdated", {
        auctionId: payload.auctionId,
        currentPrice: result.room.currentPrice,
        minprice: result.room.minprice,
        bids: result.room.bids,
        latestBid: result.latestBid,
      });
    },
  );
});

// --------------------------------------------------------------------------
// START THE SERVER:
// --------------------------------------------------------------------------
const PORT = Number(process.env.PORT) || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
