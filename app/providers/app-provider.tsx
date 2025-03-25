"use client"

import { createContext, useContext, useState, useEffect } from "react"

export interface Doctor {
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

export interface Appointment {
  doctor: Doctor
  date: string
  time: string
}

interface AppContextType {
  doctors: Doctor[]
  appointments: Appointment[]
  isLoading: boolean
  currencySymbol: string
  addAppointment: (appointment: Appointment) => void
  removeAppointment: (appointmentId: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currencySymbol = "₹"

  useEffect(() => {
    // Simulate loading doctors data
    const doctorsData: Doctor[] = [
      {
        _id: "1",
        name: "Dr. Rajesh Kumar",
        speciality: "Cardiologist",
        image: "/doctors/doctor-1.jpg",
        degree: "MD, DM (Cardiology)",
        experience: "15 years",
        fees: 1500,
        about: "Experienced cardiologist with expertise in preventive cardiology and heart failure management.",
        address: {
          line1: "Apollo Hospital",
          line2: "Delhi, India"
        }
      },
      {
        _id: "2",
        name: "Dr. Priya Sharma",
        speciality: "Pediatrician",
        image: "/doctors/doctor-2.jpg",
        degree: "MD, DNB (Pediatrics)",
        experience: "12 years",
        fees: 1200,
        about: "Specialized in child healthcare with focus on growth and development.",
        address: {
          line1: "Fortis Hospital",
          line2: "Mumbai, India"
        }
      },
      {
        _id: "3",
        name: "Dr. Amit Patel",
        speciality: "Orthopedist",
        image: "/doctors/doctor-3.jpg",
        degree: "MS (Orthopedics)",
        experience: "18 years",
        fees: 2000,
        about: "Expert in joint replacement and sports medicine.",
        address: {
          line1: "Max Hospital",
          line2: "Bangalore, India"
        }
      }
    ]

    // Simulate API delay
    setTimeout(() => {
      setDoctors(doctorsData)
      setIsLoading(false)
    }, 1000)

    // Load saved appointments
    const savedAppointments = localStorage.getItem("appointments")
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments))
    }
  }, [])

  const addAppointment = (appointment: Appointment) => {
    const newAppointments = [...appointments, appointment]
    setAppointments(newAppointments)
    localStorage.setItem("appointments", JSON.stringify(newAppointments))
  }

  const removeAppointment = (appointmentId: number) => {
    const newAppointments = appointments.filter((_, index) => index !== appointmentId)
    setAppointments(newAppointments)
    localStorage.setItem("appointments", JSON.stringify(newAppointments))
  }

  return (
    <AppContext.Provider
      value={{
        doctors,
        appointments,
        isLoading,
        currencySymbol,
        addAppointment,
        removeAppointment
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
} 