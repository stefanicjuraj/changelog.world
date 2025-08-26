import { ChangelogType } from "@/app/types/changelog";

interface TypeFilterProps {
  types: ChangelogType[];
  selectedTypes: ChangelogType[];
  onSelectType: (type: ChangelogType) => void;
}

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
      return "bg-neutral-100 text-neutral-800 hover:bg-neutral-200";
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
      return "bg-neutral-500 text-white";
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
            types.forEach((type) => onSelectType(type));
          } else {
            types
              .filter((type) => !selectedTypes.includes(type))
              .forEach((type) => onSelectType(type));
          }
        }}
        className={`px-3 py-2 text-sm rounded transition-colors cursor-pointer ${
          selectedTypes.length === types.length
            ? "bg-neutral-700 text-white"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
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
