"use client";
import BackButton from './common/BackButton';
import toast from 'react-hot-toast';

export default function CitySelection({ formData, setFormData, nextStep, prevStep }) {
  const popularCities = [
    'Mumbai', 'Bangalore', 'Chennai', 'Delhi', 
    'Goa', 'Kochi', 'Kolkata', 'Mangalore', 'Hyderabad'
  ];

  const handleNext = () => {
    if (!formData.city) {
      toast.error('Please select or enter your city');
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
        <h2 className="text-2xl font-bold w-full text-center">Select your city</h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={formData.city || ''}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="Bangalore"
          className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none"
        />
        {formData.city && (
          <button
            onClick={() => setFormData({ ...formData, city: '' })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Popular Cities Section */}
      <div>
        <h3 className="text-gray-500 mb-3">Popular cities</h3>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => setFormData({ ...formData, city })}
              className={`px-4 py-2 rounded-lg border ${
                formData.city === city 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mt-4">
        <div className="text-xl">🏥</div>
        <div>
          <p className="text-gray-600">This will help us in finding the network of</p>
          <p className="font-medium">Cashless Hospitals in your city</p>
        </div>
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