
import Sidebar from "./components/Sidebar";
import ProductFeed from "./components/ProductFeed";
import NewsletterForm from "./components/NewsletterForm";

export default function Home() {
  return (
    <div className="outer-container">
      <main className="inner-container">

        <Sidebar>

          <p><span className="dropcap">Welcome to Auction-flix </span> a marketplace dedicated to collectors, enthusiasts, and nostalgia seekers who appreciate the charm of VHS.

            From rare horror tapes and obscure straight-to-video releases to beloved classics worn from repeat viewings, Auction-flix is built for those who know that physical media still has a story to tell.</p>


          <img src="/vhs-han-small.png" alt="Auction-flix logo" className="img" />
          <NewsletterForm />
          <h3>Contact Us</h3>
          <p>Have questions or need assistance? Reach out to our support team:</p>
          <ul>
            <li>Email: support@auction-flix.com</li>
            <li>Phone: +1 (800) 123-4567</li>
          </ul>
          <p>Our team is available Monday to Friday, 9 AM to 5 PM EST. We look forward to assisting you!</p>

        </Sidebar>
        <ProductFeed />
        <Sidebar>
          <h3>Terms & Conditions </h3>
          <ul>
            <li>
              <h4>Acceptance of Terms</h4>
              <p>By accessing or using Auction-flix (&quot;the Platform&quot;), you agree to be bound by these Terms & Conditions. If you do not agree, you may not use the Platform.</p>
            </li>
            <li>
              <h4>Bidding & Purchases</h4>
              <p>All bids are binding.
                The highest bid at auction close wins the item.
                Buyers agree to complete payment within the specified timeframe.
                Failure to complete a purchase may result in account restrictions.</p>
            </li>
            <li>
              <h4>Payments</h4>
              <p>Payments must be made through approved methods provided on the Platform. Auction-flix may use third-party payment processors and is not responsible for external service issues.</p>
            </li>
            <li>
              <h4>Shipping & Delivery</h4>
              <p>Sellers are responsible for shipping items within the stated timeframe.
                Auction-flix is not liable for delays, lost shipments, or damage occurring during transit.</p>
            </li>
            <li>
              <h4>Returns & Refunds</h4>
              <p>Returns are not guaranteed and are subject to the seller’s individual policy. Buyers are encouraged to review listing details carefully before bidding.</p>
            </li>
          </ul>
        </Sidebar>
      </main>
    </div>
  );
}
