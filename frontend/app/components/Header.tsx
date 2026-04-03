"use client";

import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="logo-card">
                    <img src="/logo-6.svg" alt="Auction-flix logo" className="logo" />
                </div>
                {/* <h1>Auction-flix</h1> */}
                <h4>We sell rare VHS tapes to the top-bidder</h4>
            </header>
            <div className="nav">

                <Link className="button" href="/">Home</Link>
                <Link className="button" href="/auctions">Auctions</Link>
                <Link className="button" href="/about">About</Link>
                <Link className="button" href="/contact">Contact</Link>

            </div>
            <div className="sub-header">

                <p> The auctions are now live</p>



            </div>
        </>
    );
}
