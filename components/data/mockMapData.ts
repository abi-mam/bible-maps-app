import metadata from "./bible_maps_metadata.json"

// Category icons (pointing to public folder images)
const categoryIcons = {
  "OT Bible": "/open-book-icon.png",
  "NT Bible": "/category-icon.png",
  "NT Books": "/open-book-icon.png"
}

// Group metadata into categories
const mockMapData: Record<
  string,
  {
    count: number
    icon: string
    maps: typeof metadata
  }
> = {
  "OT Bible": {
    count: metadata.filter(m => m.category === "OT Bible").length,
    icon: categoryIcons["OT Bible"],
    maps: metadata.filter(m => m.category === "OT Bible")
  },
  "NT Bible": {
    count: metadata.filter(m => m.category === "NT Bible").length,
    icon: categoryIcons["NT Bible"],
    maps: metadata.filter(m => m.category === "NT Bible")
  },
  "NT Books": {
    count: metadata.filter(m => m.category === "NT Books").length,
    icon: categoryIcons["NT Books"],
    maps: metadata.filter(m => m.category === "NT Books")
  }
}

export default mockMapData
