"use client";

import FilterButtons from "./FilterButtons";

interface SectionHeaderProps {
  title: string;
  description: string;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  filterOptions?: string[];
  showFilters?: boolean;
}

export default function SectionHeader({
  title,
  description,
  selectedFilter,
  onFilterChange,
  filterOptions = ["전체", "월간", "주간", "일간"],
  showFilters = true
}: SectionHeaderProps) {
  return (
    <>
      <div className="mb-[20px] text-center">
        <h2 className="text-header1 font-bold text-gray-950 mb-[10px]">
          {title}
        </h2>
        <p className="text-body2 font-medium text-gray-500">{description}</p>
      </div>

      {showFilters && (
        <FilterButtons
          selectedFilter={selectedFilter}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
        />
      )}
    </>
  );
}
