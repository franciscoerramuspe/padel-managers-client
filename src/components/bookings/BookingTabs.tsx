import { Button } from "@/components/ui/button"

interface BookingTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  const tabs = [
    { id: 'upcoming', label: 'Próximas' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'past', label: 'Pasadas' },
    { id: 'cancelled', label: 'Canceladas' },
  ]

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`whitespace-nowrap ${
            activeTab === tab.id 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
} 