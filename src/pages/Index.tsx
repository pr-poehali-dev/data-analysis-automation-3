import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import OrderForm from "@/components/OrderForm"

const Index = () => {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <OrderForm />
      <PulsingCircle />
    </ShaderBackground>
  )
}

export default Index