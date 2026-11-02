import KeyWordsSection from '../sections/KeyWordsSection';
import HeroSection from '../sections/HeroSection';
import ApplicationsSection from '../sections/ApplicationsSection';
import HowIsWork from '../sections/HowIsWork';
import DeviceSection from '../sections/DeviceSection';
import ProjectProgressSection from '../sections/ProjectProgressSection';
import ContactSection from '../sections/ContactSection';

function HomePage() {
  return (
    <>
      <KeyWordsSection />
      <HeroSection />
      <DeviceSection />
      <ApplicationsSection />
      <HowIsWork />
      <ProjectProgressSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
