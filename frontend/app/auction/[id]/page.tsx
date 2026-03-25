import Link from "next/link";

type Auction = {
  id: number;
  title: string;
  description: string;
  minprice: number;
  current_price: number;
  image_url?: string;
  end_time: string;
};

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`/api/auctions/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
        <main className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950/40">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Auction not found
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            No auction exists with id <span className="font-mono">{id}</span>.
          </p>
          <Link
            className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            href="/"
          >
            Back to list
          </Link>
        </main>
      </div>
    );
  }

  if (!res.ok) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
        <main className="w-full max-w-xl rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900/40 dark:bg-zinc-950/40">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Could not load auction
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Make sure backend is running on{" "}
            <span className="font-mono">localhost:3001</span>.
          </p>
          <Link
            className="mt-4 inline-block text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            href="/"
          >
            Back to list
          </Link>
        </main>
      </div>
    );
  }

  const auction = (await res.json()) as Auction;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <div className="flex items-center justify-between gap-4">
          <h1 className="min-w-0 truncate text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {auction.title}
          </h1>
          <Link
            className="shrink-0 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            href="/"
          >
            Back
          </Link>
        </div>

        <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
          {auction.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Minimum price
            </div>
            <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">
              {auction.minprice}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Current price
            </div>
            <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">
              {auction.current_price}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          Websocket bidding UI comes next (placeBid / bidRefused / bidUpdated).
        </div>
      </main>
    </div>
  );
}

