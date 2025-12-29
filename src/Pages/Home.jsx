import Hero from "../Component/Hero"
import Card from "../Component/Card"
import Card2 from "../Component/Card2"
import PromoBanner from "../Component/PromoBanner"
import FeaturedCollections from "../Component/FeaturedCollections"
import NewArrivals from "../Component/NewArrivals"
import Newsletter from "../Component/Newsletter"
import Testimonials from "../Component/Testimonials"
import Spotlight from "../Component/Spotlight"
import AnimatedCTA from "../Component/AnimatedCTA"
import Partners from "../Component/Partners"
import SocialsBar from "../Component/SocialsBar"
import Footer from "../Component/Footer"


const Home = () => {
  return (
    <div>
      <Hero/>
      <PromoBanner />
        <Card/>
      <Card2/>
      <NewArrivals />
      <FeaturedCollections />
      
      <Spotlight />
      <AnimatedCTA />
      <Partners />
      <Testimonials />

      <Newsletter />
      <SocialsBar />
      <Footer />
      

    </div>
  )
}

export default Home
