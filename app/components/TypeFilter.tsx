import { ChangelogType } from "@/types/changelog";

interface TypeFilterProps {
  types: ChangelogType[];
  selectedTypes: ChangelogType[];
  onSelectType: (type: ChangelogType) => void;
}

// Function to get color based on changelog type
export function getTypeColor(type: ChangelogType): string {
  switch (type) {
    case "Added":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Changed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "Deprecated":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Removed":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "Fixed":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    case "Security":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
}

function getSelectedTypeColor(type: ChangelogType): string {
  switch (type) {
    case "Added":
      return "bg-green-500 text-white";
    case "Changed":
      return "bg-blue-500 text-white";
    case "Deprecated":
      return "bg-yellow-500 text-white";
    case "Removed":
      return "bg-red-500 text-white";
    case "Fixed":
      return "bg-purple-500 text-white";
    case "Security":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export function TypeFilter({
  types,
  selectedTypes,
  onSelectType,
}: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <button
        onClick={() => {
          if (selectedTypes.length === types.length) {
            // If all are selected, clicking "All" deselects everything
            types.forEach((type) => onSelectType(type));
          } else {
            // Otherwise, select all types
            types
              .filter((type) => !selectedTypes.includes(type))
              .forEach((type) => onSelectType(type));
          }
        }}
        className={`px-3 py-2 text-sm rounded transition-colors cursor-pointer ${
          selectedTypes.length === types.length
            ? "bg-gray-700 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>

      {types.map((type) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className={`px-3 py-2 text-sm rounded transition-colors cursor-pointer ${
            selectedTypes.includes(type)
              ? getSelectedTypeColor(type)
              : getTypeColor(type)
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
