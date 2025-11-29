import Tabs from "../tabs/Tabs";

type SearchResultsHeaderProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  resultCount: number;
  locationFilter: string;
};
export default function SearchResultsHeader({
    activeTab,
    onTabChange,
    resultCount,
    locationFilter,
  }: SearchResultsHeaderProps) {
    return (
      <div className="flex flex-col gap-4 mb-6">
        <Tabs activeTab={activeTab} setActiveTab={onTabChange} />
        <p className="text-sm text-gray-500">
          Showing {resultCount}{" "}
          {resultCount === 1 ? "property" : "properties"}
          {locationFilter ? ` in "${locationFilter}"` : ""}
        </p>
      </div>
    );
  }