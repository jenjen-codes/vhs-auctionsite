import { RowDataPacket } from "mysql2/promise";
import { connection } from "../data/db";

export interface Auction extends RowDataPacket {
  id: number;
  title: string;
  year: number;
  description: string;
  minprice: number;
  current_price: number;
  image_url: string;
  end_time: Date;
  created_at: Date;
}

// --------------------------------------------------------------------------
// GET ALL AUCTIONS:
// --------------------------------------------------------------------------
export async function findAllAuctions(): Promise<Auction[]> {
  let conn = await connection;
  const [rows] = await conn.query<Auction[]>("SELECT * FROM auction_items", []);
  return rows;
}

// --------------------------------------------------------------------------
// GET AUCTION BY ID:
// --------------------------------------------------------------------------
export async function findAuctionById(id: number): Promise<Auction | null> {
  let conn = await connection;
  const [rows] = await conn.query<Auction[]>(
    "SELECT * FROM auction_items WHERE id = ?",
    [id],
  );
  return rows[0] || null;
}

// --------------------------------------------------------------------------
// SAVE NEW ACTION:
// --------------------------------------------------------------------------
export async function saveNewAuction(
  title: string,
  year: number,
  description: string,
  minprice: number,
  current_price: number,
  image_url: string,
  end_time: Date,
): Promise<Auction> {
  let conn = await connection;
  const [result] = await conn.query(
    "INSERT INTO auction_items (title, year, description, minprice, current_price, image_url, end_time) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, year, description, minprice, current_price, image_url, end_time],
  );
  const insertId = (result as any).insertId;
  const auction = await findAuctionById(insertId);
  if (!auction) {
    throw new Error("Failed to retrieve the newly created auction");
  }
  return auction;
}

// --------------------------------------------------------------------------
// UPDATE AUCTION:
// --------------------------------------------------------------------------
export async function updateAuction(
  id: number,
  title: string,
  year: number,
  description: string,
  minprice: number,
  current_price: number,
  image_url: string,
  end_time: Date,
): Promise<Auction | null> {
  let conn = await connection;
  await conn.query(
    "UPDATE auction_items SET title = ?, year = ?, description = ?, minprice = ?, current_price = ?, image_url = ?, end_time = ? WHERE id = ?",
    [
      title,
      year,
      description,
      minprice,
      current_price,
      image_url,
      end_time,
      id,
    ],
  );
  const updatedAuction = await findAuctionById(id);
  return updatedAuction;
}

// --------------------------------------------------------------------------
// DELETE AUCTION:
// --------------------------------------------------------------------------
export async function deleteAuction(id: number): Promise<void> {
  let conn = await connection;
  await conn.query("DELETE FROM auction_items WHERE id = ?", [id]);
}

// --------------------------------------------------------------------------
// UPDATE CURRENT PRICE ONLY:
// --------------------------------------------------------------------------
export async function updateAuctionCurrentPrice(
  id: number,
  currentPrice: number,
): Promise<void> {
  const conn = await connection;
  await conn.query("UPDATE auction_items SET current_price = ? WHERE id = ?", [
    currentPrice,
    id,
  ]);
}
