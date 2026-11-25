import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import StepIndicator from '../forms/StepIndicator';
import StepPersonalInfo from '../forms/StepPersonalInfo';
import StepEducation from '../forms/StepEducation';
import StepSkillsProjects from '../forms/StepSkillsProjects';
import StepExperience from '../forms/StepExperience';

export default function CreatePortfolioPage({ portfolioData, setPortfolioData }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepVisited, setMaxStepVisited] = useState(1);
  const [errors, setErrors] = useState({});

  // Step validation
  const validateStep = (step) => {
    const errs = {};

    if (step === 1) {
      const { fullName, professionalTitle, email, phone, location, aboutMe } = portfolioData.personal;
      if (!fullName?.trim()) errs.fullName = 'Full Name is required.';
      if (!professionalTitle?.trim()) errs.professionalTitle = 'Professional Title is required.';
      if (!email?.trim()) {
        errs.email = 'Email Address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!phone?.trim()) errs.phone = 'Phone Number is required.';
      if (!location?.trim()) errs.location = 'Location is required.';
      if (!aboutMe?.trim()) errs.aboutMe = 'Professional summary (About Me) is required.';
    }

    if (step === 2) {
      if (!portfolioData.education || portfolioData.education.length === 0) {
        errs.education = 'Please add at least one education entry before continuing.';
      }
    }

    // Step 3 and 4 have no blocking errors as long as user filled what they have
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepVisited((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 4 completed -> navigate to preview page
      navigate('/preview');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleStepJump = (stepNumber) => {
    // If jumping forward beyond current, validate current first
    if (stepNumber > currentStep) {
      if (!validateStep(currentStep)) return;
    }
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bgLight pb-24">
      {/* Step Progress Bar */}
      <StepIndicator
        currentStep={currentStep}
        onStepClick={handleStepJump}
        maxStepVisited={maxStepVisited}
      />

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-borderLight shadow-sm p-6 sm:p-8">
          {currentStep === 1 && (
            <StepPersonalInfo
              data={portfolioData.personal}
              onChange={(updatedPersonal) =>
                setPortfolioData((prev) => ({ ...prev, personal: updatedPersonal }))
              }
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <StepEducation
              data={portfolioData.education}
              onChange={(updatedEducation) =>
                setPortfolioData((prev) => ({ ...prev, education: updatedEducation }))
              }
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <StepSkillsProjects
              data={portfolioData}
              onChange={(updatedData) => setPortfolioData(updatedData)}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <StepExperience
              data={portfolioData}
              onChange={(updatedData) => setPortfolioData(updatedData)}
            />
          )}

          {/* Sticky Navigation Footer within card */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-borderLight">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-borderLight bg-white text-xs font-semibold text-textMain hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? 'Back to Home' : 'Back'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-all shadow-sm hover:shadow"
            >
              <span>{currentStep === 4 ? 'Generate Portfolio' : 'Continue'}</span>
              {currentStep === 4 ? (
                <Sparkles className="w-4 h-4 text-accent" />
              ) : (
                <ArrowRight className="w-4 h-4 text-accent" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
