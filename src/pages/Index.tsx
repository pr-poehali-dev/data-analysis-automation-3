import { useState } from "react"
import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import OrderModal from "@/components/OrderModal"
import Footer from "@/components/Footer"
import PolicyModal from "@/components/PolicyModal"

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [policyType, setPolicyType] = useState<"privacy" | "agency" | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <ShaderBackground>
        <Header onOpenModal={() => setModalOpen(true)} />
        <HeroContent onOpenModal={() => setModalOpen(true)} />
        <PulsingCircle />
        <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </ShaderBackground>
      <Footer onOpenPolicy={(type) => setPolicyType(type)} />
      <PolicyModal
        open={policyType !== null}
        type={policyType}
        onClose={() => setPolicyType(null)}
      />
    </div>
  )
}

export default Index
