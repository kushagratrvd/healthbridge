"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

// Mock doctors data - in a real app, you would fetch this from an API
const doctorsData = [
  {
    _id: "1",
    name: "Dr. Michael Chen",
    speciality: "Cardiology",
    image: "/placeholder.svg?height=200&width=200",
    degree: "MD, FACC",
    experience: "15+ years",
    fees: 150,
    about:
      "Dr. Michael Chen is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in preventive cardiology, heart failure management, and interventional procedures.",
    address: {
      line1: "123 Medical Center Blvd, Suite 300",
      line2: "San Francisco, CA 94143",
    },
  },
  {
    _id: "2",
    name: "Dr. Sarah Johnson",
    speciality: "Neurology",
    image: "/placeholder.svg?height=200&width=200",
    degree: "MD, PhD",
    experience: "12+ years",
    fees: 180,
    about:
      "Dr. Sarah Johnson is a neurologist specializing in the diagnosis and treatment of disorders of the nervous system, including the brain, spinal cord, and peripheral nerves.",
    address: {
      line1: "456 Health Sciences Drive",
      line2: "San Francisco, CA 94158",
    },
  },
  {
    _id: "3",
    name: "Dr. James Wilson",
    speciality: "Pediatrics",
    image: "/placeholder.svg?height=200&width=200",
    degree: "MD, FAAP",
    experience: "10+ years",
    fees: 120,
    about:
      "Dr. James Wilson is a board-certified pediatrician dedicated to providing comprehensive care for children from birth through adolescence. He focuses on preventive care and childhood development.",
    address: {
      line1: "789 Children's Way",
      line2: "San Francisco, CA 94110",
    },
  },
  {
    _id: "4",
    name: "Dr. Emily Rodriguez",
    speciality: "Orthopedics",
    image: "/placeholder.svg?height=200&width=200",
    degree: "MD, FAAOS",
    experience: "14+ years",
    fees: 160,
    about:
      "Dr. Emily Rodriguez is an orthopedic surgeon specializing in sports medicine and joint replacement. She has extensive experience treating athletes and helping patients regain mobility.",
    address: {
      line1: "321 Sports Medicine Parkway",
      line2: "San Francisco, CA 94107",
    },
  },
  {
    _id: "5",
    name: "Dr. David Kim",
    speciality: "Dermatology",
    image: "/placeholder.svg?height=200&width=200",
    degree: "MD, FAAD",
    experience: "8+ years",
    fees: 140,
    about:
      "Dr. David Kim is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. He treats conditions affecting the skin, hair, and nails.",
    address: {
      line1: "555 Skin Care Boulevard",
      line2: "San Francisco, CA 94115",
    },
  },
]

// Define types for our context
export type Doctor = {
  _id: string
  name: string
  speciality: string
  image: string
  degree: string
  experience: string
  fees: number
  about: string
  address: {
    line1: string
    line2: string
  }
}

export type Appointment = {
  doctor: Doctor
  date: string
  time: string
}

type AppContextType = {
  doctors: Doctor[]
  currencySymbol: string
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  removeAppointment: (index: number) => void
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  doctors: [],
  currencySymbol: "$",
  appointments: [],
  addAppointment: () => {},
  removeAppointment: () => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    setIsClient(true)

    // Load appointments from localStorage if available
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      try {
        setAppointments(JSON.parse(savedAppointments))
      } catch (e) {
        console.error("Failed to parse saved appointments", e)
      }
    }
  }, [])

  // Save appointments to localStorage when they change
  useEffect(() => {
    if (isClient && appointments.length > 0) {
      localStorage.setItem("appointments", JSON.stringify(appointments))
    }
  }, [appointments, isClient])

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }

  const removeAppointment = (index: number) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index))
  }

  const value = {
    doctors: doctorsData,
    currencySymbol: "$",
    appointments,
    addAppointment,
    removeAppointment,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

