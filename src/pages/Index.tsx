import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import LoanApplication from "@/components/LoanApplication";
import Education from "@/components/Education";
import DonorPortal from "@/components/DonorPortal";
import { HealthcareSupport } from "@/components/HealthcareSupport";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Dashboard />
      <LoanApplication />
      <Education />
      <HealthcareSupport />
      <DonorPortal />
      <Footer />
    </div>
  );
};

export default Index;
