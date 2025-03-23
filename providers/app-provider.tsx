"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

// Mock doctors data
const doctorsData = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    speciality: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=300&auto=format&fit=crop",
    degree: "MD, FACC",
    experience: "15 years",
    fees: 150,
    about: "Dr. Johnson is a board-certified cardiologist with extensive experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    address: {
      line1: "123 Medical Center Drive",
      line2: "Suite 101, New York, NY 10001"
    }
  },
  {
    _id: "2",
    name: "Dr. Michael Chen",
    speciality: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&h=300&auto=format&fit=crop",
    degree: "MD, PhD",
    experience: "12 years",
    fees: 180,
    about: "Dr. Chen is a leading neurologist specializing in movement disorders and neurodegenerative diseases. He combines clinical expertise with cutting-edge research.",
    address: {
      line1: "456 Neuroscience Boulevard",
      line2: "Floor 3, Boston, MA 02115"
    }
  },
  {
    _id: "3",
    name: "Dr. Emily Rodriguez",
    speciality: "Pediatrician",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&h=300&auto=format&fit=crop",
    degree: "MD, FAAP",
    experience: "10 years",
    fees: 120,
    about: "Dr. Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from newborns to adolescents. She has a special interest in childhood development and preventive care.",
    address: {
      line1: "789 Children's Way",
      line2: "Chicago, IL 60601"
    }
  },
  {
    _id: "4",
    name: "Dr. James Wilson",
    speciality: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&h=300&auto=format&fit=crop",
    degree: "MD, FAAOS",
    experience: "18 years",
    fees: 200,
    about: "Dr. Wilson is a highly skilled orthopedic surgeon specializing in sports medicine and joint replacement. He has helped numerous athletes return to peak performance.",
    address: {
      line1: "321 Sports Medicine Center",
      line2: "Los Angeles, CA 90012"
    }
  },
  {
    _id: "5",
    name: "Dr. Priya Patel",
    speciality: "Dermatologist",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=300&h=300&auto=format&fit=crop",
    degree: "MD, FAAD",
    experience: "8 years",
    fees: 160,
    about: "Dr. Patel is a board-certified dermatologist specializing in both medical and cosmetic dermatology. She is known for her expertise in treating complex skin conditions.",
    address: {
      line1: "567 Skin Care Lane",
      line2: "Miami, FL 33101"
    }
  }
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
  isLoading: boolean
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  doctors: [],
  currencySymbol: "$",
  appointments: [],
  addAppointment: () => {},
  removeAppointment: () => {},
  isLoading: true
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [doctors, setDoctors] = useState<Doctor[]>([])

  // Use useEffect to ensure this only runs on the client
  useEffect(() => {
    setIsClient(true)
    
    // Initialize doctors data
    setDoctors(doctorsData)

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Load appointments from localStorage if available
    try {
      const savedAppointments = localStorage.getItem("appointments")
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments))
      }
    } catch (e) {
      console.error("Failed to parse saved appointments", e)
    }

    return () => clearTimeout(timer)
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
    doctors,
    currencySymbol: "$",
    appointments,
    addAppointment,
    removeAppointment,
    isLoading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

