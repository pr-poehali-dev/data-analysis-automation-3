import { useState } from "react"
import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import OrderModal from "@/components/OrderModal"

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ShaderBackground>
      <Header onOpenModal={() => setModalOpen(true)} />
      <HeroContent onOpenModal={() => setModalOpen(true)} />
      <PulsingCircle />
      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ShaderBackground>
  )
}

export default Index
