import { FormEvent } from "react";
import { Auction } from "../types/auction";

type Bid = {
  bidder: string;
  amount: number;
  createdAt: string;
};

type AuctionRoomViewProps = {
  auction: Auction;
  bidder: string;
  amount: string;
  currentPrice: number;
  bids: Bid[];
  errorMessage: string | null;
  onBidderChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function AuctionRoomView({
  auction,
  bidder,
  amount,
  currentPrice,
  bids,
  errorMessage,
  onBidderChange,
  onAmountChange,
  onSubmit,
}: AuctionRoomViewProps) {
  return (
    <section className="auction-room">
      <div className="auction-room-media">
        <img
          src={auction.image_url}
          alt={auction.title}
          className="auction-room-image"
        />
      </div>

      <div className="auction-room-summary">
        <div className="auction-room-prices">
          <div className="auction-stat-minimum">
            <span>Minimum bid</span>
            <div>${auction.minprice.toFixed(2)}</div>
          </div>
          <div className="auction-stat">
            <span>Current bid</span>
            <strong>${currentPrice.toFixed(2)}</strong>
          </div>
        </div>

        <div className="auction-room-copy">
          <p className="auction-room-year">Released: {auction.year}</p>
          <p>{auction.description}</p>
        </div>

        <form onSubmit={onSubmit} className="auction-bid-form">
          <h2>Place a bid</h2>
          <input
            className="auction-input"
            placeholder="Your name"
            value={bidder}
            onChange={(event) => onBidderChange(event.target.value)}
            required
          />
          <input
            className="auction-input"
            placeholder="Bid amount"
            type="number"
            min={currentPrice + 1}
            step="1"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            required
          />
          <button type="submit" className="button bidding-button">
            Submit bid
          </button>
        </form>

        {errorMessage ? <p className="auction-room-error">{errorMessage}</p> : null}

        <div className="auction-bids-panel">
          <h3>Live bids</h3>
          {bids.length === 0 ? (
            <p className="auction-bids-empty">No bids yet. Be the first.</p>
          ) : (
            <ul className="auction-bids-list">
              {[...bids].reverse().map((bid, index) => (
                <li
                  key={`${bid.createdAt}-${index}`}
                  className="auction-bid-entry"
                >
                  <span>{bid.bidder}</span>
                  <strong>${bid.amount.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </section>
  );
}
