"use client";

import { useState, Suspense } from "react";
import dynamic from 'next/dynamic';
import CitySelection from "@/components/CitySelection";
import MedicalHistory from "@/components/MedicalHistory";

// Dynamically import components with loading fallback
const StepOne = dynamic(() => import("@/components/StepOne"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const StepTwo = dynamic(() => import("@/components/StepTwo"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

const ConfirmationPage = dynamic(() => import("@/components/ConfirmationPage"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: '',
    selectedMembers: [],
    familyMembers: [], // Will store objects like { type: 'son', age: '5' }
    firstName: "",
    lastName: "",
    age: "",
    city: '',
    medicalConditions: [],
    whatsappUpdates: false
  });

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <StepOne 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={() => setStep(2)} 
            />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <StepTwo 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={() => setStep(3)} 
              prevStep={() => setStep(1)} 
            />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <CitySelection 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={() => setStep(4)} 
              prevStep={() => setStep(2)} 
            />
          </Suspense>
        );
      case 4:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <MedicalHistory 
              formData={formData} 
              setFormData={setFormData} 
              nextStep={() => setStep(5)} 
              prevStep={() => setStep(3)} 
            />
          </Suspense>
        );
      case 5:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationPage 
              formData={formData} 
              prevStep={() => setStep(4)} 
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full p-8 bg-white shadow-sm rounded-xl">
        {renderStep()}
      </div>
    </div>
  );
}
