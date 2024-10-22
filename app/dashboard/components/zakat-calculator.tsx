"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"

// This data is simplified. In a real application, you'd want to fetch this from an API or database.
const zakatRates = {
  Selangor: { "Beras Super": 7, "Beras Biasa": 5 },
  Perak: { "Beras Super": 6.5, "Beras Biasa": 4.5 },
}

export default function ZakatCalculator() {
  const [state, setState] = useState("")
  const [riceType, setRiceType] = useState("")
  const [pax, setPax] = useState(1)
  const [reminderDate, setReminderDate] = useState("")
  const [totalZakat, setTotalZakat] = useState(0)

  const calculateZakat = () => {
    if (state && riceType && pax) {
      const rate = zakatRates[state][riceType]
      setTotalZakat(rate * pax)
    }
  }

  const setReminder = () => {
    // In a real application, you'd want to integrate with a calendar API or notification system
    alert(`Reminder set for ${reminderDate}`)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] bg-orange-200 border-4 border-black flex flex-col">
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div>
            <Label htmlFor="state">State</Label>
            <Select onValueChange={setState}>
              <SelectTrigger id="state" className="border-2 border-black">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(zakatRates).map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="riceType">Rice Type</Label>
            <Select onValueChange={setRiceType}>
              <SelectTrigger id="riceType" className="border-2 border-black">
                <SelectValue placeholder="Select rice type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beras Super">Beras Super</SelectItem>
                <SelectItem value="Beras Biasa">Beras Biasa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="pax">Number of People</Label>
            <Input
              id="pax"
              type="number"
              min="1"
              value={pax}
              onChange={(e) => setPax(parseInt(e.target.value))}
              className="border-2 border-black"
            />
          </div>
          <Button onClick={calculateZakat} className="w-full bg-blue-400 hover:bg-blue-500 text-black font-bold py-2 px-4 border-2 border-black">
            Calculate Zakat
          </Button>
          {totalZakat > 0 && (
            <div className="text-center font-bold text-2xl">
              Total Zakat: RM {totalZakat.toFixed(2)}
            </div>
          )}
        </div>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="reminder">Set Reminder</Label>
            <div className="flex space-x-2">
              <Input
                id="reminder"
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="border-2 border-black"
              />
              <Button onClick={setReminder} className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 border-2 border-black">
                <CalendarIcon className="mr-2 h-4 w-4" /> Set
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 border-2 border-black"
          onClick={() => window.open("https://www.zakatselangor.com.my/", "_blank")}
        >
          Pay Zakat
        </Button>
      </CardFooter>
    </Card>
  )
}