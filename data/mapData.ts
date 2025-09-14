import { BookIcon, ScrollIcon, CrossIcon } from "../components/icons"
import mapMetadata from "./bible_maps_metadata.json"

const categoryIcons: Record<string, JSX.Element> = {
  OT: <BookIcon />,
  NT: <CrossIcon />,
  NTBooks: <ScrollIcon />,
}

const mockMapData = {
  OT: {
    title: "OT Bible",
    icon: categoryIcons["OT"],
    maps: mapMetadata
      .filter(m => m.category === "OT")
      .map(m => ({
        id: m.id,
        title: m.title,
        thumbnail: `/maps/ot/${m.thumbnail_filename}`,
        fullImage: `/maps/ot/${m.filename}`,
      })),
  },
  NT: {
    title: "NT Bible",
    icon: categoryIcons["NT"],
    maps: mapMetadata
      .filter(m => m.category === "NT")
      .map(m => ({
        id: m.id,
        title: m.title,
        thumbnail: `/maps/nt/${m.thumbnail_filename}`,
        fullImage: `/maps/nt/${m.filename}`,
      })),
  },
  NTBooks: {
    title: "NT Books",
    icon: categoryIcons["NTBooks"],
    maps: mapMetadata
      .filter(m => m.category === "NTBooks")
      .map(m => ({
        id: m.id,
        title: m.title,
        thumbnail: `/maps/ntbooks/${m.thumbnail_filename}`,
        fullImage: `/maps/ntbooks/${m.filename}`,
      })),
  },
}

export default mockMapData
