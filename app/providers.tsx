"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/components/translation-provider"
import { AppProvider } from "@/providers/app-provider"
import { createContext, useState, useContext, type ReactNode, useEffect } from "react"

// Mock doctors data
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
    speciality: "Orthopedic Surgeon",
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

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </ThemeProvider>
    </AppProvider>
  )
}

