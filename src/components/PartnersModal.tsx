import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Icon from "@/components/ui/icon"

interface Partner {
  name: string
  description: string
  url: string
  icon: string
}

const partners: Partner[] = [
  {
    name: "Экскурсии по Ялте",
    description: "Лучшие экскурсии и туры по Ялте и Крыму. Индивидуальные и групповые программы.",
    url: "https://exursyalta.ru/",
    icon: "Map",
  },
  {
    name: "Заказать такси",
    description: "Трансфер и такси по Крыму. Комфортные поездки по доступным ценам.",
    url: "https://ug-transfer.online/",
    icon: "Car",
  },
]

interface PartnersModalProps {
  open: boolean
  onClose: () => void
}

export default function PartnersModal({ open, onClose }: PartnersModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-white/10 border-t-2 border-t-yellow-400 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-medium">Наши партнёры</DialogTitle>
        </DialogHeader>
        <p className="text-white/40 text-xs mb-4">Проверенные услуги от наших партнёров в Крыму</p>
        <div className="flex flex-col gap-3">
          {partners.map((partner) => (
            <a
              key={partner.url}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-yellow-400/40 hover:bg-white/8 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Icon name={partner.icon} size={20} className="text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors">{partner.name}</h3>
                <p className="text-white/50 text-xs mt-0.5">{partner.description}</p>
              </div>
              <Icon name="ExternalLink" size={16} className="text-white/30 group-hover:text-yellow-400 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}