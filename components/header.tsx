"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cloud, Menu, Image, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { SignInButton } from "@/components/sign-in-button"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  const navigation = [
    {
      name: "Images",
      href: "#images",
      icon: Image
    },
    {
      name: "History",
      href: "#history",
      icon: History,
      authRequired: true
    }
  ]

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    if (item.authRequired && !isAuthenticated) return null

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === item.href && "text-primary"
        )}
        onClick={() => {
          const element = document.querySelector(item.href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
          setIsOpen(false)
        }}
      >
        <item.icon className="h-4 w-4" />
        {item.name}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Cloud className="h-6 w-6" />
          <span className="font-bold">Weather Info Generator</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/about" && "text-primary"
              )}
            >
              About
            </Link>
            <ModeToggle />
            {isAuthenticated ? <UserNav /> : <SignInButton />}
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
                <Link
                  href="/about"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <ModeToggle />
                {isAuthenticated ? <UserNav /> : <SignInButton />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}