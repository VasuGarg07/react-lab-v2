import React from 'react'
import JobNav from '../components/JobNav'
import HeroSection from '../components/HeroComponent'
import HowItWorks from '../components/HowItWorks'
import HomeCTACards from '../components/HomeCTACards'
import Footer from '../components/Footer'
import { useJobscape } from '../JobscapeProvider'

const JobHome: React.FC = () => {
    const { role } = useJobscape();
    return (
        <>
            <JobNav userType={role || 'none'} />
            <HeroSection />
            <HowItWorks />
            {!role && <HomeCTACards />}
            <Footer />
        </>
    )
}

export default JobHome