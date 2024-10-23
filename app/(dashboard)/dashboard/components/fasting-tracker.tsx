"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MoonIcon } from "lucide-react"
import { useEffect, useState } from "react"

type DayStatus = {
  date: Date
  fasted: boolean
  onPeriod?: boolean
}

export default function FastingTracker() {
  const [isFemale, setIsFemale] = useState(false)
  const [daysStatus, setDaysStatus] = useState<DayStatus[]>([])

  // Ramadan 2025 is expected to start around March 1, 2025 and end around March 30, 2025
  // These dates may need to be adjusted based on moon sighting
  const ramadanStart = new Date(2025, 2, 1)
  const ramadanEnd = new Date(2025, 2, 30)

  useEffect(() => {
    const days: DayStatus[] = []
    const endTime = ramadanEnd.getTime()

    for (
      let currentDate = new Date(ramadanStart);
      currentDate.getTime() <= endTime;
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
    ) {
      days.push({
        date: new Date(currentDate),
        fasted: false
      })
    }

    setDaysStatus(days)
  }, [ramadanStart, ramadanEnd])

  const toggleFasted = (date: Date) => {
    setDaysStatus(prevStatus => 
      prevStatus.map(day => 
        day.date.getTime() === date.getTime() ? { ...day, fasted: !day.fasted } : day
      )
    )
  }

  const togglePeriod = (date: Date) => {
    setDaysStatus(prevStatus => 
      prevStatus.map(day => 
        day.date.getTime() === date.getTime() ? { ...day, onPeriod: !day.onPeriod } : day
      )
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] bg-green-200 border-4 border-black flex flex-col">
      <CardContent className="pt-2 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            ramadhan 1446 AH / 2025 CE
          </h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="female-switch"
              checked={isFemale}
              onCheckedChange={setIsFemale}
            />
            <Label htmlFor="female-switch">Female</Label>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-bold">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 overflow-y-auto flex-grow">
          {Array.from({ length: ramadanStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="w-full h-12"></div>
          ))}
          {daysStatus.map((day, index) => (
            <div key={index} className="relative">
              <Button
                className={`w-full h-12 p-1 text-xs border-2 border-black ${
                  day.fasted ? 'bg-blue-400' : 'bg-white'
                }`}
                onClick={() => toggleFasted(day.date)}
              >
                {day.date.getDate()}
                {day.fasted && <MoonIcon className="absolute top-0 right-0 w-3 h-3" />}
              </Button>
              {isFemale && (
                <Checkbox
                  checked={day.onPeriod}
                  onCheckedChange={() => togglePeriod(day.date)}
                  className="absolute bottom-0 right-0 w-3 h-3 border-2 border-black"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-400 border-2 border-black"></div>
            <span>fasted</span>
          </div>
          {isFemale && (
            <div className="flex items-center space-x-2">
              <Checkbox className="w-4 h-4 border-2 border-black" checked={false} />
              <span>period day</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}