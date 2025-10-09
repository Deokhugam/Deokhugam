"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Buttons/Button";
import SectionHeader from "../ui/SectionHeader";
import EmptyState from "../ui/EmptyState";
import {
  getPopularBooks,
  type PopularBook,
  type PopularBooksParams
} from "@/api/books";
import BookCard from "../books/BookCard";
import clsx from "clsx";
import useResponsiveLimit from "@/hooks/book/useResponsiveLimit";

export default function PopularBooks() {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);

  const limit = useResponsiveLimit("popularBook");

  const getPeriodFromFilter = (
    filter: string
  ): PopularBooksParams["period"] => {
    switch (filter) {
      case "일간":
        return "DAILY";
      case "주간":
        return "WEEKLY";
      case "월간":
        return "MONTHLY";
      case "전체":
        return "ALL_TIME";
      default:
        return "DAILY";
    }
  };

  const fetchPopularBooks = useCallback(
    async (period: PopularBooksParams["period"] = "DAILY") => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPopularBooks({
          period,
          direction: "ASC",
          limit
        });

        const books = response.content;

        if (books.length === 0) {
          setHasData(false);
          setPopularBooks([]);
        } else {
          setHasData(true);
          // rank 기준으로 정렬 (낮은 순위가 더 높은 인기)
          books.sort((a, b) => a.rank - b.rank);
          setPopularBooks(books);
        }
      } catch (err) {
        console.error("인기도서 조회 실패:", err);
        setError("인기도서를 불러오는데 실패했습니다.");
        setHasData(false);
        setPopularBooks([]);
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchPopularBooks(getPeriodFromFilter(selectedFilter));
  }, [selectedFilter, fetchPopularBooks]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    fetchPopularBooks(getPeriodFromFilter(filter));
  };

  return (
    <div>
      <SectionHeader
        title="🏆 인기 도서"
        description="어떤 책이 좋을까? 지금 가장 인기 있는 도서"
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <div className="flex justify-center py-8 ">
          <p className="text-body2 text-gray-500">로딩 중...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-8 ">
          <p className="text-body2 text-red-500">{error}</p>
        </div>
      ) : !hasData ? (
        <EmptyState
          title=""
          description="등록된 인기 도서가 없습니다."
          iconSrc="images/icon/ic_book2.svg"
          iconAlt="도서 아이콘"
        />
      ) : (
        <>
          <div
            className={clsx(
              "flex mx-auto gap-[24px] mb-[30px] min-h-[400px] flex-wrap",
              popularBooks.length === 4
                ? "w-[908px]"
                : popularBooks.length === 3
                  ? "w-[675px]"
                  : popularBooks.length === 2
                    ? "w-[442px]"
                    : "w-[209px]",
              "max-lg:w-full max-lg:justify-center max-lg:items-center"
            )}
          >
            {popularBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/books">
              <Button variant="outline">
                도서 더보기
                <Image
                  src="/images/icon/ic_chevron-right.svg"
                  alt="더보기"
                  width={16}
                  height={16}
                />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
