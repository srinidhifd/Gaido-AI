"use client";
import BackButton from './common/BackButton';
import { formatConditionName } from '@/utils/formatters';
import toast from 'react-hot-toast';

export default function ConfirmationPage({ formData, prevStep }) {
  const handleSubmit = () => {
    // Final validation before submission
    if (!formData.gender || 
        !formData.city || 
        !formData.familyMembers.length || 
        !formData.medicalConditions.length) {
      toast.error('Please complete all required information');
      return;
    }

    // Check if all family members have ages
    if (formData.familyMembers.some(member => !member.age)) {
      toast.error('Please ensure all family members have ages selected');
      return;
    }

    toast.success('Application submitted successfully!');
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center relative">
        <div className="absolute left-0">
          <BackButton onClick={prevStep} />
        </div>
        <h1 className="text-2xl font-bold w-full text-center">Review Your Details</h1>
        <p className="text-gray-500 text-sm mt-1">Please verify all information before submission</p>
      </div>

      {/* Summary Sections */}
      <div className="space-y-4">
        {/* Personal Details */}
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <h2 className="text-base font-semibold p-4 border-b border-gray-100">Personal Details</h2>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Gender:</span>
              <span className="font-medium capitalize">{formData.gender}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">City:</span>
              <span className="font-medium">{formData.city}</span>
            </div>
          </div>
        </div>

        {/* Family Members */}
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <h2 className="text-base font-semibold p-4 border-b border-gray-100">Family Members</h2>
          <div className="divide-y divide-gray-100">
            {formData.familyMembers.map((member, index) => (
              <div key={index} className="flex justify-between items-center p-4">
                <span className="text-gray-500 capitalize">{member.type}</span>
                <span className="font-medium">{member.age} years</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <h2 className="text-base font-semibold p-4 border-b border-gray-100">Medical History</h2>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {formData.medicalConditions?.length > 0 ? (
                formData.medicalConditions.map((condition) => (
                  <span 
                    key={condition} 
                    className="bg-gray-50 px-3 py-1 rounded-md text-sm text-gray-600"
                  >
                    {formatConditionName(condition)}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No medical conditions reported</p>
              )}
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="rounded-lg border border-gray-100 overflow-hidden">
          <h2 className="text-base font-semibold p-4 border-b border-gray-100">Communication Preferences</h2>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">WhatsApp Updates</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                formData.whatsappUpdates 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-gray-50 text-gray-600'
              }`}>
                {formData.whatsappUpdates ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors mt-4"
      >
        Submit Application
      </button>
    </div>
  );
}
  