import Hero from '../../components/Hero'
import FeatureSection from '../../components/FeatureSection'
import Banner from '../../components/common/Banner'
import Testimonial from '../../components/Testimonial'
import Newsletter from '../../components/Newsletter'

const Home = () => {
  return (
    <>
        <Hero />
        <FeatureSection />
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Banner />
        </div>
        <Testimonial />
        <Newsletter />
    </>
  )
}

export default Home
