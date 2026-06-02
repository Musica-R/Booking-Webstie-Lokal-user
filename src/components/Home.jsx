import React from 'react'
import Hero from '../pages/Hero'
import Services from '../pages/Services'
import EssentialServices from '../pages/EssentialServices'
import Activities from '../pages/Activities'
import Stalls from '../pages/Stalls'
import Professionals from '../pages/Professionals'
import Testimonials from '../pages/Testimonials'
import AppBanner from '../pages/AppBanner'
import Accordion from '../pages/Accordion'

const Home = () => {
    return (
        <div>
            <Hero />
            <Services />
            <EssentialServices />
            <Activities />
            <Stalls />
            <Professionals />
            <Testimonials />
            <AppBanner />
            <Accordion />
        </div>
    )
}

export default Home