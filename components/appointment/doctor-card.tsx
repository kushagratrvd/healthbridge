"use client"

import { Doctor } from "@/providers/app-provider"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface DoctorCardProps {
  doctor: Doctor
  compact?: boolean
}

export function DoctorCard({ doctor, compact }: DoctorCardProps) {
  const router = useRouter()

  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={() => router.push(`/patient/appointments/book/${doctor._id}`)}
    >
      <CardContent className="p-0">
        <div className="relative w-full aspect-[4/3] bg-muted">
          <Image
            src={doctor.image || "/placeholder.svg"}
            alt={`Dr. ${doctor.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-600">Available</span>
            </span>
          </div>
          <h3 className="font-semibold text-lg">{doctor.name}</h3>
          <p className="text-muted-foreground">{doctor.speciality}</p>
          {!compact && (
            <p className="text-sm text-muted-foreground mt-1">
              ${doctor.fees} per consultation
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

