// Unsplash API configuration
export const UNSPLASH_ACCESS_KEY = "0Ky-YmriIozm-EYEteuNQVFN10M0A5W56Aq3_a5dI6g"

interface UnsplashImage {
  urls: {
    regular: string
    small: string
  }
  alt_description: string
  user: {
    name: string
    links: {
      html: string
    }
  }
  links: {
    html: string
  }
}

interface ImageResult {
  url: string
  alt: string
  credit: {
    name: string
    link: string
  }
  sourceUrl: string
}

export async function getUnsplashImages(city: string, count: number = 5): Promise<ImageResult[]> {
  const cleanQuery = city.trim().toLowerCase()
  
  // Create more specific search queries for better relevance
  const searchQueries = [
    `${cleanQuery} cityscape`,
    `${cleanQuery} city skyline`,
    `${cleanQuery} landmarks`,
    `${cleanQuery} downtown`,
    `${cleanQuery} architecture`
  ]

  try {
    // Fetch images for each specific query
    const imagePromises = searchQueries.map(async (query) => {
      const searchParams = new URLSearchParams({
        query,
        per_page: '1', // Get one best result per query
        orientation: 'landscape',
        content_filter: 'high',
        client_id: UNSPLASH_ACCESS_KEY
      })

      const response = await fetch(
        `https://api.unsplash.com/search/photos?${searchParams.toString()}`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.results[0] // Return the best match for each query
    })

    const results = await Promise.all(imagePromises)
    
    // Filter out any undefined results and transform to our format
    return results
      .filter((img): img is UnsplashImage => !!img)
      .map((img) => ({
        url: img.urls.regular,
        alt: img.alt_description || `Photo of ${city}`,
        credit: {
          name: img.user.name,
          link: img.user.links.html
        },
        sourceUrl: img.links.html
      }))

  } catch (error) {
    console.error('Error fetching Unsplash images:', error)
    return []
  }
}