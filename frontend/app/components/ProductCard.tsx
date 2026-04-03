import Link from "next/link";
import { Auction } from "../types/auction";

type ProductCardProps = {
    item: Auction;
};

export default function ProductCard({ item }: ProductCardProps) {
    return (
        <div className="product-card">
            <h2 className="product-title">{item.title}</h2>
            <div className="image-wrapper">
                <img
                    src={item.image_url}
                    alt={item.title}
                    className="product-image"
                />
            </div>
            <div className="price-wrapper">
                <div className="product-price-title"> Current bid: </div>
                <div className="price-current">
                    ${item.current_price.toFixed(2)}
                </div>
            </div>
            <div className="description-wrapper">
                <p> Year: {item.year} </p>
                <span>Description:</span>
                <p className="product-description">{item.description}</p>
            </div>
            <Link href={`/auction/${item.id}`} className="button bidding-button">
                Go to Auction
            </Link>
        </div>
    );
}
