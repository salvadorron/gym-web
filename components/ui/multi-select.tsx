"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Training } from "@/lib/definitions"

type MultiSelectProps = {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = "Seleccionar items..." }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex min-h-[40px] w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-blue-800 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => (
              <Badge key={crypto.randomUUID()} variant="secondary" className="mr-1 mb-1">
                {item}
                <button
                  className="ml-1 ring-offset-blue-800 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-gray-800 hover:text-blue-800" />
                </button>
              </Badge>
            ))}
            {selected.length === 0 && <span className="text-gray-800">{placeholder}</span>}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar clase..." className="h-9" />
          <CommandList>
            <CommandEmpty>No se encontraron clases.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(
                      selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option],
                    )
                    setOpen(true)
                  }}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-blue-800",
                      selected.includes(option) ? "bg-blue-800 text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <X className="h-4 w-4" />
                  </div>
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

