import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

interface CitySearchProps {
  value: string
  onChange: (city: string) => void
  cities: string[]
  placeholder: string
  required?: boolean
}

export default function CitySearch({ value, onChange, cities, placeholder, required }: CitySearchProps) {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const filtered = search
    ? cities.filter(c => c.toLowerCase().includes(search.toLowerCase()))
    : cities

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSelect = (city: string) => {
    onChange(city)
    setSearch("")
    setOpen(false)
  }

  const handleClear = () => {
    onChange("")
    setSearch("")
  }

  return (
    <div ref={ref} className="relative">
      {value ? (
        <div className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm flex items-center justify-between">
          <span>{value}</span>
          <button type="button" onClick={handleClear} className="text-white/30 hover:text-white/60 transition-colors">
            <Icon name="X" size={14} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            required={required && !value}
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors pr-10"
          />
          <Icon name="Search" size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" />
        </div>
      )}
      {open && !value && (
        <div className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto rounded-xl border border-white/15 bg-neutral-900/95 backdrop-blur-md">
          {filtered.length > 0 ? (
            filtered.map(city => (
              <button
                key={city}
                type="button"
                onClick={() => handleSelect(city)}
                className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {city}
              </button>
            ))
          ) : search.trim() ? (
            <button
              type="button"
              onClick={() => handleSelect(search.trim())}
              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors rounded-xl"
            >
              Выбрать «{search.trim()}»
            </button>
          ) : (
            <div className="px-4 py-3 text-white/30 text-sm">Начните вводить название</div>
          )}
        </div>
      )}
    </div>
  )
}