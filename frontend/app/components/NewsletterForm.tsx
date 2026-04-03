export default function NewsletterForm() {
    return (
        <div className="newsletter-form">
            <h3>Subscribe to our newsletter!</h3>
            
            <p>Get the latest updates on new auctions, exclusive offers, and more.</p>
            <form>
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
}
