import { BookResponse } from "@/api/books";
import ActionMenu from "@/components/common/ActionMenu";
import StarRating from "@/components/common/StarRating";
import { BOOK_DETAIL_FIELDS } from "@/constants/bookDetailInfo";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import Image from "next/image";

type Book = {
  publisher: string;
  publishedDate: string;
  isbn: string;
};

export default function BookInfo({ data }: { data: BookResponse | null }) {
  const { open, setOpen, dropdownRef } = useClickOutside();

  if (!data) return;
  return (
    <div className="flex-[1]">
      <div className="pb-6 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <p className="text-header1 font-semibold line-clamp-2 leading-snug text-gray-950">
            {data.title}
          </p>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="min-w-6 pt-1"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                src="/images/icon/ic_more.svg"
                alt="더보기"
                width={24}
                height={24}
              />
            </button>
            {open && <ActionMenu />}
          </div>
        </div>
        <p className="py-1 text-gray-900 font-medium">{data.author}</p>
        <div className="flex items-center gap-1">
          <StarRating rating={data.rating} />
          <span className="text-body4 font-medium text-gray-500">
            ({data.reviewCount})
          </span>
        </div>
      </div>
      <div className="py-6 space-y-5 border-b border-gray-100">
        {BOOK_DETAIL_FIELDS.map(({ key, label }) => (
          <div key={key} className="flex gap-5 text-body3 font-medium">
            <span className="min-w-[42px] text-gray-500">{label}</span>
            <span className="text-gray-600">
              {data && data[(key as keyof Book) || "-"]}
            </span>
          </div>
        ))}
      </div>
      {data.description.split("\n").map((line, i) => (
        <p key={i} className="mt-6 text-gray-700 text-body3 font-medium">
          {line}
        </p>
      ))}
    </div>
  );
}
