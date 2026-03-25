import Link from "next/link";
import Room from "./room";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-black">
        <div className="flex items-center justify-between gap-4">
          <h1 className="min-w-0 truncate text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Auction room
          </h1>
          <Link
            className="shrink-0 text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            href="/"
          >
            Back
          </Link>
        </div>

        <Room auctionId={id} />
      </main>
    </div>
  );
}

