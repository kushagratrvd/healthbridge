"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppContext } from "@/context/app-context"
import type { Doctor } from "@/context/app-context"

type DoctorCardProps = {
  doctor: Doctor
  compact?: boolean
}

export function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  const { currencySymbol } = useAppContext()
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/patient/appointments/book/${doctor._id}`)}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <div className={`relative ${compact ? "aspect-square" : "aspect-[4/3]"}`}>
        <Image src={doctor.image || "/placeholder.svg"} alt={doctor.name} fill className="object-cover bg-blue-50" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center text-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p>Available</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{doctor.name}</p>
        <p className="text-gray-600 text-sm">{doctor.speciality}</p>
        {doctor.fees && !compact && (
          <p className="text-gray-700 text-sm mt-1">
            {currencySymbol}
            {doctor.fees} per consultation
          </p>
        )}
      </div>
    </div>
  )
}

