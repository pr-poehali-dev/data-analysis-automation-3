import { useEffect } from "react"
import Icon from "@/components/ui/icon"
import OrderForm from "@/components/OrderForm"

interface OrderModalProps {
  open: boolean
  onClose: () => void
}

export default function OrderModal({ open, onClose }: OrderModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
        <OrderForm />
      </div>
    </div>
  )
}
