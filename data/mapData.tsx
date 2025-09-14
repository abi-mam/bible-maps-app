// data/mapData.tsx
import { BookIcon, ScrollIcon, CrossIcon } from "../components/icons"
import rawMetadata from "./bible_maps_metadata.json"

type RawMap = {
  id?: string
  title: string
  filename: string
  thumbnail_filename: string
  category: "ot" | "nt" | "nt_books"
}

const categoryMap: Record<
  RawMap["category"],
  { key: "OT" | "NT" | "NTBooks"; folder: string; icon: any; title: string }
> = {
  ot: { key: "OT", folder: "ot", icon: ScrollIcon, title: "OT Bible" },
  nt: { key: "NT", folder: "nt", icon: CrossIcon, title: "NT Bible" },
  nt_books: { key: "NTBooks", folder: "ntbooks", icon: BookIcon, title: "NT Books" },
}

// ✅ Pre-initialize categories so they always exist
const mockMapData: Record<string, { title: string; icon: any; maps: any[] }> = {
  OT: { title: "OT Bible", icon: ScrollIcon, maps: [] },
  NT: { title: "NT Bible", icon: CrossIcon, maps: [] },
  NTBooks: { title: "NT Books", icon: BookIcon, maps: [] },
}

// ✅ Safely extract maps array from JSON
const mapsArray: RawMap[] = Array.isArray((rawMetadata as any).maps)
  ? ((rawMetadata as any).maps as RawMap[])
  : []

mapsArray.forEach((m, i) => {
  const categoryInfo = categoryMap[m.category]
  if (!categoryInfo) return

  const { key, folder } = categoryInfo
  mockMapData[key].maps.push({
    id: m.id ?? `${key}-${i}`,
    title: m.title ?? "Untitled",
    thumbnail: m.thumbnail_filename
      ? `/maps/${folder}/${m.thumbnail_filename}`
      : "/placeholder.svg",
    fullImage: m.filename
      ? `/maps/${folder}/${m.filename}`
      : "/placeholder.svg",
  })
})

// ✅ Debug log
console.log("📌 mockMapData built:", mockMapData)

export default mockMapData
