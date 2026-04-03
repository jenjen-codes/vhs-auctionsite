import { Auction } from "../types/auction";

export async function getAuctions(): Promise<Auction[]> {
  const res = await fetch("http://localhost:3001/api/auctions", {
    cache: "no-store",
  });
  return res.json();
}

export async function getAuction(id: string): Promise<Auction> {
  const res = await fetch(`http://localhost:3001/api/auctions/${id}`, {
    cache: "no-store",
  });
  return res.json();
}
