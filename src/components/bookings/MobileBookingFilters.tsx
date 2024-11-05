import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { BookingTabs } from "./BookingTabs"
import { Input } from "../ui/input"
import { Search } from "lucide-react"

interface MobileBookingFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileBookingFilters({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange
}: MobileBookingFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar reservas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Estado</label>
            <BookingTabs 
              activeTab={activeTab} 
              onTabChange={onTabChange}
              className="flex-col space-y-2"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 