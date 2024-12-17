import { formatDistanceToNow } from "date-fns"
import { History, X } from "lucide-react"
import { useAuth } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SearchHistory() {
  const { user, removeFromHistory } = useAuth()

  if (!user?.searchHistory?.length) return null

  return (
    <Card className="w-full mt-8" id="history">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Search History
        </CardTitle>
        <CardDescription>Your recent weather searches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user.searchHistory.map((search) => (
            <div
              key={search.timestamp}
              className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
            >
              <span className="font-medium">{search.location}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(search.timestamp, { addSuffix: true })}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-muted/50 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
                      onClick={() => removeFromHistory(search.timestamp)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove from history</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove from history</TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}