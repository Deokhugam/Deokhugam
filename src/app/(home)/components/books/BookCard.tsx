"use client";

import Link from "next/link";
import BookImage from "./BookImage";
import BookInfo from "./BookInfo";
import type { PopularBook } from "@/api/books";
import clsx from "clsx";

interface BookCardProps {
  book: PopularBook;
}

export default function BookCard({ book }: BookCardProps) {
  if (book.isEmpty) {
    return (
      <div className={clsx("flex-1", "max-lg:max-w-min")}>
        <BookImage thumbnailUrl="" title="" rank={0} isEmpty={true} />
        <BookInfo
          title=""
          author=""
          rating={0}
          reviewCount={0}
          isEmpty={true}
        />
      </div>
    );
  }

  return (
    <div className={clsx("flex-1", "max-lg:max-w-min")}>
      <Link href={`/books/${book.bookId}`} className="block">
        <BookImage
          thumbnailUrl={book.thumbnailUrl}
          title={book.title}
          rank={book.rank}
          isEmpty={false}
        />
        <BookInfo
          title={book.title}
          author={book.author}
          rating={book.rating}
          reviewCount={book.reviewCount}
        />
      </Link>
    </div>
  );
}
