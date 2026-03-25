"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Auction = {
  id: number;
  title: string;
  description: string;
  minprice: number;
  current_price: number;
  image_url?: string;
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
    return <p className="text-sm text-zinc-800">Loading auction...</p>;
  }

  if (!auction) {
    return <p className="text-sm text-red-700">{errorMessage}</p>;
  }

  return (
    <section className="mt-5 grid gap-5">
      {auction.image_url ? (
        <img
          src={auction.image_url}
          alt={auction.title}
          className="h-72 w-full rounded-xl object-cover"
        />
      ) : null}
      <p className="text-sm text-zinc-900">{auction.description}</p>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs text-zinc-700">Minimum price</div>
          <div className="mt-1 font-mono text-zinc-900">{auction.minprice}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="text-xs text-zinc-700">Current price</div>
          <div className="mt-1 font-mono text-zinc-900">{currentPrice}</div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-xl border border-zinc-200 p-4">
        <h2 className="text-sm font-semibold text-zinc-950">Place bid</h2>
        <input
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-700"
          placeholder="Your name"
          value={bidder}
          onChange={(e) => setBidder(e.target.value)}
        />
        <input
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-700"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600"
        >
          Submit bid
        </button>
      </form>

      {errorMessage ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      <div className="rounded-xl border border-zinc-200 p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Bids</h3>
        {!bids.length ? (
          <p className="mt-2 text-sm text-zinc-800">No bids yet.</p>
        ) : (
          <ul className="mt-2 grid gap-2">
            {[...bids]
              .slice()
              .reverse()
              .map((bid, index) => (
                <li
                  key={`${bid.createdAt}-${index}`}
                  className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2 text-sm"
                >
                  <span className="text-zinc-900">{bid.bidder}</span>
                  <span className="font-mono text-zinc-900">{bid.amount}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
