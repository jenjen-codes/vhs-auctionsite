import { ResultSetHeader } from "mysql2/promise";
import { connection } from "../data/db";

export async function saveBid(
  auctionId: number,
  bidder: string,
  amount: number,
): Promise<void> {
  const conn = await connection;
  await conn.query<ResultSetHeader>(
    "INSERT INTO bids (auction_id, bidder, amount) VALUES (?, ?, ?)",
    [auctionId, bidder, amount],
  );
}
