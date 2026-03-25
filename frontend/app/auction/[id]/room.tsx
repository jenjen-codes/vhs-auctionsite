"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Auction = {
  id: number;
  title: string;
  description: string;
  minprice: number;
  current_price: number;
};

type Bid = {
  bidder: string;
  amount: number;
  createdAt: string;
};

type BidUpdatedPayload = {
  auctionId: string;
  currentPrice: number;
  minprice: number;
  bids: Bid[];
};

export default function Room({ auctionId }: { auctionId: string }) {
  const socketRef = useRef<Socket | null>(null);
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bidder, setBidder] = useState("");
  const [amount, setAmount] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);

  const socketUrl = useMemo(
    () => process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001",
    [],
  );

  useEffect(() => {
    async function setupRoom() {
      setLoading(true);
      setErrorMessage(null);

      try {
        const res = await fetch(`/api/auctions/${auctionId}`);
        if (!res.ok) {
          setErrorMessage("Could not load this auction.");
          setLoading(false);
          return;
        }

        const auctionData = (await res.json()) as Auction;
        setAuction(auctionData);
        setCurrentPrice(auctionData.current_price);
        setLoading(false);

        socketRef.current = io(socketUrl);
        socketRef.current.emit("joinAuction", auctionId);

        socketRef.current.on("bidUpdated", (payload: BidUpdatedPayload) => {
          if (payload.auctionId !== auctionId) {
            return;
          }

          setCurrentPrice(payload.currentPrice);
          setBids(payload.bids);
          setErrorMessage(null);
        });

        socketRef.current.on("bidRefused", (payload: { reason: string; auctionId: string }) => {
          if (payload.auctionId === auctionId) {
            setErrorMessage(payload.reason);
          }
        });
      } catch {
        setErrorMessage("Connection error. Check backend and database.");
        setLoading(false);
      }
    }

    setupRoom();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [auctionId, socketUrl]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const bidAmount = Number(amount);
    if (!Number.isFinite(bidAmount)) {
      setErrorMessage("Please enter a valid bid amount.");
      return;
    }

    socketRef.current?.emit("placeBid", {
      auctionId,
      bidder,
      amount: bidAmount,
    });
    setAmount("");
  }

  if (loading) {
    return <p className="text-sm text-zinc-600 dark:text-zinc-300">Loading auction...</p>;
  }

  if (!auction) {
    return <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>;
  }

  return (
    <section className="mt-5 grid gap-5">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{auction.description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Minimum price</div>
          <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">{auction.minprice}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Current price</div>
          <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">{currentPrice}</div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Place bid</h2>
        <input
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Your name"
          value={bidder}
          onChange={(e) => setBidder(e.target.value)}
        />
        <input
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
        >
          Submit bid
        </button>
      </form>

      {errorMessage ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Bids</h3>
        {!bids.length ? (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">No bids yet.</p>
        ) : (
          <ul className="mt-2 grid gap-2">
            {[...bids]
              .slice()
              .reverse()
              .map((bid, index) => (
                <li
                  key={`${bid.createdAt}-${index}`}
                  className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700"
                >
                  <span>{bid.bidder}</span>
                  <span className="font-mono">{bid.amount}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
