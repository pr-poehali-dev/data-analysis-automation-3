import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PolicyModalProps {
  open: boolean
  type: "privacy" | "agency" | null
  onClose: () => void
}

const privacyContent = `
**Политика конфиденциальности**

Дата вступления в силу: 1 января 2024 года

**1. Общие положения**
Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей, оставляющих заявки на сайте.

**2. Какие данные мы собираем**
— Имя и контактный номер телефона
— Информация об автомобиле (марка, модель)
— Адрес подачи эвакуатора

**3. Цели обработки данных**
Данные используются исключительно для:
— Обработки заявок на вызов эвакуатора
— Обратной связи с клиентом
— Улучшения качества оказываемых услуг

**4. Хранение и защита данных**
Персональные данные хранятся на защищённых серверах и не передаются третьим лицам без согласия пользователя, за исключением случаев, предусмотренных законодательством.

**5. Согласие**
Оставляя заявку на сайте, вы даёте согласие на обработку персональных данных в соответствии с настоящей Политикой.

**6. Контакты**
По вопросам обработки персональных данных: Yaltataran@gmail.com
`

const agencyContent = `
**Агентский договор**

Дата вступления в силу: 1 января 2024 года

**1. Предмет договора**
Настоящий Агентский договор регулирует отношения между Агентом (оператором сайта) и Принципалом (клиентом) при оказании услуг эвакуатора и трансфера по территории Республики Крым.

**2. Услуги Агента**
Агент обязуется:
— Принимать заявки на услуги эвакуатора и трансфера
— Организовывать подачу транспортного средства в указанное место
— Обеспечивать своевременное выполнение заказа

**3. Обязанности Принципала**
Принципал обязуется:
— Предоставить достоверную информацию о местонахождении и автомобиле
— Оплатить услуги в соответствии с действующим прейскурантом
— Обеспечить доступ к транспортному средству

**4. Стоимость услуг**
Стоимость рассчитывается индивидуально в зависимости от дальности подачи, типа транспортного средства и условий выполнения заказа.

**5. Ответственность**
Агент несёт ответственность за сохранность транспортного средства с момента погрузки до момента выгрузки в указанном месте.

**6. Контакты**
По всем вопросам: +7 995 614-14-14 · Yaltataran@gmail.com
`

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-semibold text-white mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>
    }
    if (line.startsWith("— ")) {
      return <p key={i} className="text-white/70 text-sm pl-3">• {line.slice(2)}</p>
    }
    if (line.trim() === "") return <div key={i} className="h-1" />
    return <p key={i} className="text-white/70 text-sm">{line}</p>
  })
}

export default function PolicyModal({ open, type, onClose }: PolicyModalProps) {
  const title = type === "privacy" ? "Политика конфиденциальности" : "Агентский договор"
  const content = type === "privacy" ? privacyContent : agencyContent

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-white/10 border-t-2 border-t-yellow-400 text-white max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-medium">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-1">
          {type && renderContent(content)}
        </div>
      </DialogContent>
    </Dialog>
  )
}