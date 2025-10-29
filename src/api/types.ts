type MediaItem = {
  title: string
  year: number
  category: string
  rating: string
  isBookmarked: boolean
  isTrending: boolean
};

type RegularThumbnail = {
  small: string
  medium: string
  large: string
};

export type Regular = MediaItem & {
  thumbnail: {
    regular: RegularThumbnail
  }
};

export type Trending = MediaItem & {
  thumbnail: {
    trending: {
      small: string
      large: string
    }
    regular: RegularThumbnail
  }
};