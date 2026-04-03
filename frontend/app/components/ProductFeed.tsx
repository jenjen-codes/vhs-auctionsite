

import ProductCard from "./ProductCard";
import { Auction } from "../types/auction";
import { getAuctions } from "../lib/api";


export default async function ProductFeed() {
    const auctions: Auction[] = await getAuctions();

    return (
        <div className="product-feed-wrapper">
            <div className="product-title-wrapper">
                <h3 className="product-feed-title">Live Auctions</h3>
                <div className="red-dot"></div>
            </div>
            <div className="product-container">
                {auctions.map((auction: Auction) => (
                    <ProductCard key={auction.id} item={auction} />
                ))}
            </div>
        </div>

    );
}
