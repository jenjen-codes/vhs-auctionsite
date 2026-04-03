"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import AuctionRoomView from "../../components/AuctionRoomView";
import { Auction } from "../../types/auction";
import Sidebar from "@/app/components/Sidebar";
import NewsletterForm from "@/app/components/NewsletterForm";

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

type BidRefusedPayload = {
  auctionId: string;
  reason: string;
};

type RoomProps = {
  auctionId: string;
  initialAuction: Auction;
};

export default function Room({ auctionId, initialAuction }: RoomProps) {
  const socketRef = useRef<Socket | null>(null);
  const [bidder, setBidder] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState(initialAuction.current_price);
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

    const socket = io(socketUrl);
    socketRef.current = socket;
    socket.emit("joinAuction", auctionId);

    socket.on("bidUpdated", (payload: BidUpdatedPayload) => {
      if (payload.auctionId !== auctionId) {
        return;
      }

      setCurrentPrice(payload.currentPrice);
      setBids(payload.bids);
      setErrorMessage(null);
    });

    socket.on("bidRefused", (payload: BidRefusedPayload) => {
      if (payload.auctionId === auctionId) {
        setErrorMessage(payload.reason);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [auctionId]);

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

  return (
    <>
    <AuctionRoomView
      auction={initialAuction}
      bidder={bidder}
      amount={amount}
      currentPrice={currentPrice}
      bids={bids}
      errorMessage={errorMessage}
      onBidderChange={setBidder}
      onAmountChange={setAmount}
      onSubmit={onSubmit}

    />
    </>
  );
}
