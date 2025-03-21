"use client"

import * as React from "react"

// Simple Select components
export function Select({
  children,
  onValueChange,
  defaultValue,
}: {
  children: React.ReactNode,
  onValueChange?: (value: string) => void,
  defaultValue?: string
}) {
  return (
    <div className="relative">
      {children}
    </div>
  )
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm">
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 opacity-50">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </div>
  )
}

export function SelectItem({ children, value }: { children: React.ReactNode, value: string }) {
  return (
    <div className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-gray-100">
      {children}
    </div>
  )
} 