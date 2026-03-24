import { Router, Request, Response } from "express";
import { NewAuctionDTO, UpdateAuctionDTO } from "../DTOs/auctionDTO";
import {
  findAllAuctions,
  findAuctionById,
  deleteAuction,
  saveNewAuction,
  updateAuction,
} from "../models/auctions";

const auctionRouter = Router();

// --------------------------------------------------------------------------

/**
 * @swagger
 * /api/auctions:
 *   get:
 *     summary: Retrieve a list of available auctions
 *     responses:
 *       200:
 *         description: A list of available auctions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 0
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *           */

// --------------------------------------------------------------------------
// GET ALL AUCTIONS:
// --------------------------------------------------------------------------
auctionRouter.get("/api/auctions", async (req: Request, res: Response) => {
  const auctions = await findAllAuctions();
  res.json(auctions);
});

// --------------------------------------------------------------------------

/**
 * @swagger
 * /api/auctions/{id}:
 *   get:
 *     summary: Retrieve a single auction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The auction ID
 *     responses:
 *       200:
 *         description: A single auction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                     example: 0
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *       404:
 *         description: Auction not found
 *           */

// --------------------------------------------------------------------------
// GET AUCTION BY ID:
// --------------------------------------------------------------------------
auctionRouter.get("/api/auctions/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const auction = await findAuctionById(id);
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(404).json({ message: "Auction not found." });
  }
});

// --------------------------------------------------------------------------

/**
 * @swagger
 * /api/auctions:
 *   post:
 *     summary: Create a new auction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *     responses:
 *       201:
 *         description: Auction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *           */

// --------------------------------------------------------------------------
// ADD NEW AUCTION:
// --------------------------------------------------------------------------
auctionRouter.post("/api/auctions", async (req: Request, res: Response) => {
  console.log(req.body);
  const newAuctionDTO: NewAuctionDTO = req.body as NewAuctionDTO;
  const newAuction = await saveNewAuction(
    newAuctionDTO.title,
    newAuctionDTO.year,
    newAuctionDTO.description,
    newAuctionDTO.minprice,
    newAuctionDTO.current_price,
    newAuctionDTO.image_url,
    newAuctionDTO.end_time,
  );
  res.status(201).json(newAuction);
});

// --------------------------------------------------------------------------

/**
 * @swagger
 * /api/auctions/{id}:
 *   put:
 *     summary: Update an existing auction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The auction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   id:
 *                     type: number
 *                     example: 0
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *     responses:
 *       200:
 *         description: Auction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                     example: 0
 *                   title:
 *                     type: string
 *                     example: Event Horizon
 *                   year:
 *                     type: number
 *                     example: 1997
 *                   description:
 *                     type: string
 *                     example: A rescue crew is tasked with investigating the mysterious reappearance of a spaceship that had been lost for seven years.
 *                   minprice:
 *                     type: number
 *                     example: 1
 *                   current_price:
 *                     type: number
 *                     example: 9999999
 *                   image_url:
 *                     type: string
 *                     example: cool-url
 *                   end_time:
 *                     type: date
 *                     example: 2060-01-01 00:00:00
 *           */

// --------------------------------------------------------------------------
// UPDATE AUCTION:
// --------------------------------------------------------------------------
auctionRouter.put("/api/auctions/:id", async (req: Request, res: Response) => {
  const auctionId = parseInt(req.params.id as string);
  const updateAuctionDTO = req.body as UpdateAuctionDTO;
  const updatedAuction = await updateAuction(
    auctionId,
    updateAuctionDTO.title,
    updateAuctionDTO.year,
    updateAuctionDTO.description,
    updateAuctionDTO.minprice,
    updateAuctionDTO.current_price,
    updateAuctionDTO.image_url,
    updateAuctionDTO.end_time,
  );
  return res.status(200).json(updatedAuction);
});

// --------------------------------------------------------------------------

/** * @swagger
 * /api/auctions/{id}:
 *   delete:
 *     summary: Delete an auction
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The auction ID
 *     responses:
 *       204:
 *         description: Auction deleted successfully

 */

// --------------------------------------------------------------------------
// DELETE AUCTION:
// --------------------------------------------------------------------------
auctionRouter.delete(
  "/api/auctions/:id",
  async (req: Request, res: Response) => {
    const auctionId = parseInt(req.params.id as string);
    await deleteAuction(auctionId);
    res.status(204).send();
  },
);

//---------------------------------------------------------------------------

export default auctionRouter;
