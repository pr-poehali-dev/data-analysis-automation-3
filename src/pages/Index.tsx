import ShaderBackground from "@/components/ShaderBackground"
import HeroContent from "@/components/HeroContent"
import PulsingCircle from "@/components/PulsingCircle"
import Header from "@/components/Header"
import OrderForm from "@/components/OrderForm"

const Index = () => {
  return (
    <ShaderBackground>
      <Header />
      <div className="min-h-screen flex flex-col">
        <div className="relative flex-1" style={{ minHeight: "100vh" }}>
          <HeroContent />
          <PulsingCircle />
        </div>
        <OrderForm />
      </div>
    </ShaderBackground>
  )
}

export default Index