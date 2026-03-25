import Link from "next/link";

export default function Home() {
  // Server Component: fetch via Next rewrite (/api -> backend)
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-6 bg-white py-20 px-6 sm:px-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Auctions
          </h1>
          <p className="text-sm text-zinc-600">
            Browse available auctions and place bids in real time.
          </p>
        </header>

        <AuctionsList />
      </main>
    </div>
  );
}

type Auction = {
  id: number;
  title: string;
  description: string;
  minprice: number;
  current_price: number;
  image_url?: string;
  end_time: string;
};

async function AuctionsList() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  const res = await fetch(`${apiBaseUrl}/api/auctions`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Could not load auctions. Make sure the backend runs on{" "}
        <span className="font-mono">localhost:3001</span>.
      </div>
    );
  }

  const auctions = (await res.json()) as Auction[];

  if (!auctions.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        No auctions found.
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {auctions.map((a) => (
        <li
          key={a.id}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300"
        >
          <div className="flex items-start gap-4">
            {a.image_url ? (
              <img
                src={a.image_url}
                alt={a.title}
                className="h-40 w-28 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="h-40 w-28 shrink-0 rounded-lg bg-zinc-100" />
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-zinc-900">
                    {a.title}
                  </h2>
                  <p className="mt-1 line-clamp-3 text-sm text-zinc-600">
                    {a.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs text-zinc-500">
                    Current
                  </div>
                  <div className="font-mono text-sm text-zinc-900">
                    {a.current_price}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="text-xs text-zinc-500">
                  Min: <span className="font-mono">{a.minprice}</span>
                </div>
                <Link
                  className="text-sm font-medium text-blue-700 hover:underline"
                  href={`/auction/${a.id}`}
                >
                  View auction
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
