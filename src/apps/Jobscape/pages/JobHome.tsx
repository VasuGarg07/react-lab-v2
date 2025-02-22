import React from 'react'
import JobNav from '@/apps/Jobscape/components/JobNav'
import HeroSection from '@/apps/Jobscape/components/HeroComponent'
import HowItWorks from '@/apps/Jobscape/components/HowItWorks'
import HomeCTACards from '@/apps/Jobscape/components/HomeCTACards'
import Footer from '@/apps/Jobscape/components/Footer'
import { useJobscape } from '@/apps/Jobscape/JobscapeProvider'

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