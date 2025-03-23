"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { useAppContext, type Doctor } from "@/providers/app-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { doctors, addAppointment, isLoading } = useAppContext()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [doctor, setDoctor] = useState<Doctor | null>(null)

  // Get available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split("T")[0]
  })

  // Mock available time slots
  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:00 PM", "04:00 PM"
  ]

  useEffect(() => {
    if (doctors) {
      const foundDoctor = doctors.find(d => d._id === params.id)
      if (foundDoctor) {
        setDoctor(foundDoctor)
      }
    }
  }, [doctors, params.id])

  const handleBookAppointment = () => {
    if (!doctor || !selectedDate || !selectedTime) return

    addAppointment({
      doctor,
      date: selectedDate,
      time: selectedTime
    })

    router.push("/patient/appointments/confirmation")
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="container max-w-4xl py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Doctor not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-[2fr_3fr] gap-6">
            {/* Doctor Info */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{doctor.name}</h2>
                <p className="text-primary">{doctor.speciality}</p>
                <p className="text-sm text-muted-foreground mt-1">{doctor.experience} of experience</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">About</p>
                <p className="text-sm text-muted-foreground">{doctor.about}</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{doctor.address.line1}</p>
                <p className="text-sm text-muted-foreground">{doctor.address.line2}</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <Select onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric"
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <Select onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 