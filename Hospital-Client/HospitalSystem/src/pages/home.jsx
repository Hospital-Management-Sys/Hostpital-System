import React from 'react';
import CheerfulHeroSection from '../components/home';
import ServicesSection from '../components/service';
import TeamCarousel from '../components/team';
import HealthTipsSection from '../components/tips';
import EventsSection from '../components/events';
import CallToActionSection from '../components/appointment'
import FindBySpecialtySection from '../components/speciality';
const HomePage = () => {
  return (
    <div>
      <CheerfulHeroSection />
      <ServicesSection />
      
      <TeamCarousel />
      <FindBySpecialtySection />
      <HealthTipsSection />
      <EventsSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;