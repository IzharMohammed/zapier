"use client";

import type React from "react"

import { useState, useEffect, useRef, type RefObject } from "react"

interface Position {
  x: number
  y: number
}

export function useDraggable(ref: RefObject<HTMLElement>) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<Position>({
    x: window.innerWidth / 2 - 300,
    y: window.innerHeight / 2 - 200,
  })
  const initialMousePosition = useRef<Position>({ x: 0, y: 0 })
  const initialElementPosition = useRef<Position>({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (ref.current) {
      setIsDragging(true)
      initialMousePosition.current = { x: e.clientX, y: e.clientY }
      initialElementPosition.current = { ...position }

      // Prevent text selection during drag
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && ref.current) {
      const dx = e.clientX - initialMousePosition.current.x
      const dy = e.clientY - initialMousePosition.current.y

      const newX = initialElementPosition.current.x + dx
      const newY = initialElementPosition.current.y + dy

      // Optional: Add boundary checks here if needed
      setPosition({ x: newX, y: newY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return { position, isDragging, handleMouseDown }
}

