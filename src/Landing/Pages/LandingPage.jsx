

import { Header, Hero, Footer } from "../Components"
import { ScrollLinked } from "./ScrollLinked"


export const LandingPage = () => {
  return (
    <ScrollLinked>

      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Footer />
      </div>

    </ScrollLinked>

  )
}
