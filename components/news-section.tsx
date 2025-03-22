"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsItem {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news')
        const data = await response.json()
        setNews(data.articles)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="w-full py-12">
        <div className="container">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Healthcare News</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay updated with the latest healthcare news from India
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {news.slice(0, 6).map((item, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={item.urlToImage || '/assets/news-placeholder.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{new Date(item.publishedAt).toLocaleDateString()}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Read More <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 