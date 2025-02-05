"use client";
import BackButton from './common/BackButton';
import toast from 'react-hot-toast';

export default function StepTwo({ formData, setFormData, nextStep, prevStep }) {
  const updateMember = (index, field, value) => {
    const updatedMembers = formData.familyMembers.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setFormData({ ...formData, familyMembers: updatedMembers });
  };

  const handleNext = () => {
    const hasEmptyAge = formData.familyMembers.some(member => !member.age);
    if (hasEmptyAge) {
      toast.error('Please select age for all family members');
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
        <h2 className="text-2xl font-bold w-full text-center">Select age of covered member(s)</h2>
      </div>

      {/* Family Members List */}
      <div className="space-y-4 mt-4">
        {formData.familyMembers.map((member, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              {member.type === 'self' ? '👤' : 
               member.type === 'wife' ? '👤' :
               member.type === 'son' ? '👶' :
               member.type === 'daughter' ? '👧' :
               member.type === 'father' ? '👨' : '👩'}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">
                {member.type === 'self' ? 'Your age' :
                 member.type === 'wife' ? "Wife's age" :
                 member.type === 'son' ? "Son's age" :
                 member.type === 'daughter' ? "Daughter's age" :
                 member.type === 'father' ? "Father's age" : "Mother's age"}
              </p>
              <div className="relative">
                <select
                  value={member.age}
                  onChange={(e) => updateMember(index, "age", e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none"
                >
                  <option value="">Select age</option>
                  {[...Array(80)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} yr</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
  