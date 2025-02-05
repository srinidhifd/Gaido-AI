"use client";
import BackButton from './common/BackButton';
import toast from 'react-hot-toast';

export default function MedicalHistory({ formData, setFormData, nextStep, prevStep }) {
  const medicalConditions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'bloodPressure', label: 'Blood Pressure' },
    { id: 'heartDisease', label: 'Heart Disease' },
    { id: 'anySurgery', label: 'Any Surgery' },
    { id: 'thyroid', label: 'Thyroid' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'otherDisease', label: 'Other Disease' },
    { id: 'noneOfThese', label: 'None of These' },
  ];

  const toggleCondition = (conditionId) => {
    const currentConditions = formData.medicalConditions || [];
    
    if (conditionId === 'noneOfThese') {
      // If "None of These" is selected, clear all other selections
      setFormData({
        ...formData,
        medicalConditions: currentConditions.includes('noneOfThese') ? [] : ['noneOfThese']
      });
    } else {
      // If any other condition is selected, remove "None of These"
      const updatedConditions = currentConditions.includes(conditionId)
        ? currentConditions.filter(id => id !== conditionId)
        : [...currentConditions.filter(id => id !== 'noneOfThese'), conditionId];
      
      setFormData({
        ...formData,
        medicalConditions: updatedConditions
      });
    }
  };

  const handleNext = () => {
    if (!formData.medicalConditions || formData.medicalConditions.length === 0) {
      toast.error('Please select at least one option from medical conditions');
      return;
    }

    nextStep();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0">
          <BackButton onClick={prevStep} />
        </div>
        <h1 className="text-2xl font-bold w-full text-center">Medical History</h1>
        <p className="text-gray-600 text-center">
          Do any member(s) have any existing illnesses for which they take regular medication?
        </p>
      </div>

      {/* Medical Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {medicalConditions.map((condition) => (
          <button
            key={condition.id}
            onClick={() => toggleCondition(condition.id)}
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              (formData.medicalConditions || []).includes(condition.id)
                ? 'border-black'
                : 'border-gray-200'
            }`}
          >
            <div className={`w-5 h-5 border rounded flex items-center justify-center ${
              (formData.medicalConditions || []).includes(condition.id)
                ? 'border-black'
                : 'border-gray-300'
            }`}>
              {(formData.medicalConditions || []).includes(condition.id) && (
                <div className="w-3 h-3 bg-black rounded-sm" />
              )}
            </div>
            <span className="text-gray-700">{condition.label}</span>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
        <div className="text-xl">💡</div>
        <p className="text-gray-700">We will find you plans that cover your condition.</p>
      </div>

      {/* WhatsApp Updates Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Get Updates on WhatsApp</span>
        <button
          onClick={() => setFormData({
            ...formData,
            whatsappUpdates: !formData.whatsappUpdates
          })}
          className={`w-12 h-6 rounded-full transition-colors ${
            formData.whatsappUpdates ? 'bg-black' : 'bg-gray-200'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
            formData.whatsappUpdates ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>

      {/* Continue Button */}
      <div className="mt-6">
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Continue <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
} 