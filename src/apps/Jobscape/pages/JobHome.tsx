import React from 'react'
import JobNav from '../components/JobNav'
import HeroSection from '../components/HeroComponent'
import HowItWorks from '../components/HowItWorks'
import HomeCTACards from '../components/HomeCTACards'
import Footer from '../components/Footer'

const JobHome: React.FC = () => {
    return (
        <>
            <JobNav userType={'none'} />
            <HeroSection />
            <HowItWorks />
            <HomeCTACards />
            <Footer />
        </>
    )
}

export default JobHome