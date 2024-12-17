import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 items-center justify-center gap-4 md:justify-start">
          <Link
            href="/about"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            About Us
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-muted p-2 hover:bg-muted/80"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center text-sm md:justify-end">
          <span>© 2024 Weather Info Generator. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}