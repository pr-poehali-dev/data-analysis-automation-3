import { useState } from "react"
import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import OurWorks from "@/components/OurWorks"
import Reviews from "@/components/Reviews"

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
        <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </ShaderBackground>
      <OurWorks />
      <Reviews />
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