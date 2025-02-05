"use client";
import toast from 'react-hot-toast';

export default function StepOne({ formData, setFormData, nextStep }) {
  const familyMemberTypes = [
    { id: 'self', label: 'Self', icon: '👤' },
    { id: 'wife', label: 'Wife', icon: '👤' },
    { id: 'son', label: 'Son', icon: '👶' },
    { id: 'daughter', label: 'Daughter', icon: '👧' },
    { id: 'father', label: 'Father', icon: '👨' },
    { id: 'mother', label: 'Mother', icon: '👩' },
  ];

  const handleMemberSelection = (memberId) => {
    const currentMembers = formData.selectedMembers || [];
    
    if (memberId === 'son' || memberId === 'daughter') {
      // For son and daughter, handle count up to 2
      const currentCount = currentMembers.filter(m => m === memberId).length;
      
      if (currentCount === 0) {
        // Add first instance
        setFormData({
          ...formData,
          selectedMembers: [...currentMembers, memberId]
        });
      } else if (currentCount === 1) {
        // Toggle between 1 and 2
        const lastClickTime = formData.lastClickTime || 0;
        const now = Date.now();
        
        // If clicked within 500ms, add second member, otherwise remove the first
        if (now - lastClickTime < 500) {
          setFormData({
            ...formData,
            selectedMembers: [...currentMembers, memberId],
            lastClickTime: now
          });
        } else {
          setFormData({
            ...formData,
            selectedMembers: currentMembers.filter(m => m !== memberId),
            lastClickTime: now
          });
        }
      } else {
        // Remove one instance when count is 2
        const index = currentMembers.lastIndexOf(memberId);
        setFormData({
          ...formData,
          selectedMembers: [
            ...currentMembers.slice(0, index),
            ...currentMembers.slice(index + 1)
          ]
        });
      }
    } else {
      // For other members, toggle selection
      const isSelected = currentMembers.includes(memberId);
      setFormData({
        ...formData,
        selectedMembers: isSelected
          ? currentMembers.filter(m => m !== memberId)
          : [...currentMembers, memberId]
      });
    }
  };

  const getMemberCount = (memberId) => {
    return (formData.selectedMembers || []).filter(m => m === memberId).length;
  };

  const handleNext = () => {
    if (!formData.gender) {
      toast.error('Please select your gender');
      return;
    }

    if (!formData.selectedMembers?.length) {
      toast.error('Please select at least one family member');
      return;
    }

    // Create family members array for age selection in next step
    const familyMembers = formData.selectedMembers.map(memberId => ({
      type: memberId,
      age: ''
    }));

    setFormData({
      ...formData,
      familyMembers
    });

    nextStep();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Find the best plan for your family</h1>
      </div>

      {/* Gender Selection */}
      <div className="flex gap-4 justify-center mb-4">
        <button
          className={`px-8 py-2 rounded-lg border transition-colors ${
            formData.gender === 'male' 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData({ ...formData, gender: 'male' })}
        >
          Male
        </button>
        <button
          className={`px-8 py-2 rounded-lg border transition-colors ${
            formData.gender === 'female' 
              ? 'bg-black text-white border-black' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData({ ...formData, gender: 'female' })}
        >
          Female
        </button>
      </div>

      {/* Family Members Selection */}
      <div>
        <h2 className="text-lg font-medium mb-4">Select members you want to insure</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {familyMemberTypes.map((member) => (
            <button
              key={member.id}
              onClick={() => handleMemberSelection(member.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border ${
                (formData.selectedMembers || []).includes(member.id)
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{member.icon}</span>
              <span className="text-gray-700">{member.label}</span>
              {(member.id === 'son' || member.id === 'daughter') && getMemberCount(member.id) > 0 && (
                <span className="ml-auto bg-gray-200 px-2 rounded-full text-sm">
                  {getMemberCount(member.id)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-6">
        <button
          onClick={handleNext}
          className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continue →
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking on "Continue", you agree to our{' '}
          <a href="#" className="underline">Privacy Policy</a>,{' '}
          <a href="#" className="underline">Terms of Use</a> &{' '}
          <a href="#" className="underline">Disclaimer</a>
        </p>
      </div>
    </div>
  );
}
  