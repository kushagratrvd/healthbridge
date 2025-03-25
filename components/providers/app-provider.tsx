"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

// Mock doctors data - in a real app, you would fetch this from an API
const doctorsData = [
  {
    _id: "1",
    name: "Dr. Rajesh Kumar",
    speciality: "Cardiologist",
    image: "/assets/doctors/doc5.png",
    degree: "MD, DM (Cardiology)",
    experience: "15 years",
    fees: 1500,
    about: "Dr. Kumar is a renowned cardiologist with extensive experience in treating complex heart conditions. He specializes in interventional cardiology and preventive cardiac care.",
    address: {
      line1: "123 Healthcare Complex, Bandra West",
      line2: "Mumbai, Maharashtra 400050"
    }
  },
  {
    _id: "2",
    name: "Dr. Priya Sharma",
    speciality: "Neurologist",
    image: "/assets/doctors/doc6.png",
    degree: "MD, DM (Neurology)",
    experience: "12 years",
    fees: 1800,
    about: "Dr. Sharma is a leading neurologist specializing in movement disorders and neurodegenerative diseases. She combines traditional expertise with modern treatment approaches.",
    address: {
      line1: "456 Medical Centre, Vasant Vihar",
      line2: "New Delhi, Delhi 110057"
    }
  },
  {
    _id: "3",
    name: "Dr. Arun Patel",
    speciality: "Pediatrician",
    image: "/assets/doctors/doc7.png",
    degree: "MD (Pediatrics), DNB",
    experience: "10 years",
    fees: 1200,
    about: "Dr. Patel is a compassionate pediatrician dedicated to providing comprehensive care for children from newborns to adolescents. He has a special interest in childhood development and preventive care.",
    address: {
      line1: "789 Children's Hospital, Koramangala",
      line2: "Bangalore, Karnataka 560034"
    }
  },
  {
    _id: "4",
    name: "Dr. Meera Reddy",
    speciality: "Orthologist",
    image: "/assets/doctors/doc8.png",
    degree: "MS (Ortho), DNB",
    experience: "18 years",
    fees: 2000,
    about: "Dr. Reddy is a highly skilled orthopedic surgeon specializing in sports medicine and joint replacement. She has helped numerous patients regain mobility and lead active lives.",
    address: {
      line1: "321 Bone & Joint Clinic, Jubilee Hills",
      line2: "Hyderabad, Telangana 500033"
    }
  },
  {
    _id: "5",
    name: "Dr. Sanjay Gupta",
    speciality: "Dermatologist",
    image: "/assets/doctors/doc9.png",
    degree: "MD (Dermatology), DVD",
    experience: "8 years",
    fees: 1600,
    about: "Dr. Gupta is a board-certified dermatologist specializing in both medical and cosmetic dermatology. He is known for his expertise in treating complex skin conditions using advanced techniques.",
    address: {
      line1: "567 Skin Care Centre, Salt Lake",
      line2: "Kolkata, West Bengal 700091"
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
    currencySymbol: "₹",
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