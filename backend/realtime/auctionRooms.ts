import { findAuctionById } from "../models/auctions";

export type Bid = {
  bidder: string;
  amount: number;
  createdAt: string;
};

export class Auction {
  bids: Bid[];

  constructor(
    public id: string,
    public name: string,
    public minprice: number,
    public currentPrice: number,
  ) {
    this.bids = [];
  }
}

const auctionRooms = new Map<string, Auction>();

export async function getOrCreateAuctionRoom(
  auctionId: string,
): Promise<Auction | null> {
  const existing = auctionRooms.get(auctionId);
  if (existing) {
    return existing;
  }

  const numericId = Number(auctionId);
  if (!Number.isInteger(numericId)) {
    return null;
  }

  const auctionFromDb = await findAuctionById(numericId);
  if (!auctionFromDb) {
    return null;
  }

  const room = new Auction(
    auctionId,
    auctionFromDb.title,
    auctionFromDb.minprice,
    auctionFromDb.current_price,
  );
  auctionRooms.set(auctionId, room);
  return room;
}

export function placeBidInRoom(
  room: Auction,
  bidder: string,
  amount: number,
): { ok: true; room: Auction; latestBid: Bid } | { ok: false; reason: string } {
  if (!Number.isFinite(amount)) {
    return { ok: false, reason: "Bid amount must be a number." };
  }

  if (amount < room.minprice) {
    return {
      ok: false,
      reason: `Bid must be at least minimum price (${room.minprice}).`,
    };
  }

  if (amount <= room.currentPrice) {
    return {
      ok: false,
      reason: `Bid must be higher than current price (${room.currentPrice}).`,
    };
  }

  const latestBid: Bid = {
    bidder: bidder.trim() || "Anonymous",
    amount,
    createdAt: new Date().toISOString(),
  };

  room.currentPrice = amount;
  room.bids.push(latestBid);

  return { ok: true, room, latestBid };
}
