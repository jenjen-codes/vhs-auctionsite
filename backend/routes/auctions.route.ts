import { Router, Request, Response } from "express";
import * as data from "../data/mockDatabase";
import { NewAuctionDTO, UpdateAuctionDTO } from "../DTOs/AuctionDTO";

const auctionRouter = Router();

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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Schysst film
 *                   minprice:
 *                     type: number
 *                     example: 10
 *           */

// --------------------------------------------------------------------------
// GET ALL AUCTIONS:
// --------------------------------------------------------------------------
auctionRouter.get("/api/auctions", (req, res) => {
  res.json(data.auctions);
});

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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Schysst film
 *                   price:
 *                     type: number
 *                     example: 44
 *       404:
 *         description: Auction not found
 *           */

// --------------------------------------------------------------------------
// GET AUCTION BY ID:
// --------------------------------------------------------------------------
auctionRouter.get("/api/auctions/:id", (req, res) => {
  res.json(data.auctions.filter((auction) => auction.id === req.params.id)[0]);
});

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
 *               name:
 *                 type: string
 *                 example: Mulan
 *               price:
 *                 type: number
 *                 example: 999
 *     responses:
 *       201:
 *         description: Auction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Mulan
 *                   jersey:
 *                     type: number
 *                     example: 999
 *           */

// --------------------------------------------------------------------------
// ADD NEW AUCTION:
// --------------------------------------------------------------------------
auctionRouter.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const newAuctionDTO: NewAuctionDTO = req.body as NewAuctionDTO;
  const newAuction = await saveNewAuction(
    /* <--SKRIV DENNA FUNKTION */
    newAuctionDTO.name,
    newAuctionDTO.price,
  );
  res.status(201).json(newAuction);
});

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
 *               name:
 *                 type: string
 *                 example: The Thing
 *               startPrice:
 *                 type: number
 *                 example: 10
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
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: The Thing
 *                   startPrice:
 *                     type: number
 *                     example: 10
 *           */

// --------------------------------------------------------------------------
// UPDATE AUCTION:
// --------------------------------------------------------------------------
auctionRouter.put("/:id", async (req: Request, res: Response) => {
  const auctionId = parseInt(req.params.id as string);
  const updateAuctionDTO = req.body as UpdateAuctionDTO;
  const updatedAuction = await updateAuction(
    auctionId,
    updateAuctionDTO.name,
    updateAuctionDTO.price,
  );
  return res.status(200).json(updatedAuction);
});

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
auctionRouter.delete("/:id", async (req: Request, res: Response) => {
  const auctionId = parseInt(req.params.id as string);
  await deleteAuction(auctionId);
  res.status(204).send();
});

//---------------------------------------------------------------------------
export default auctionRouter;
