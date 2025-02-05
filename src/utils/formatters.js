export const formatConditionName = (condition) => {
  const formatMap = {
    'bloodPressure': 'Blood Pressure',
    'heartDisease': 'Heart Disease',
    'otherDisease': 'Other Disease',
    'noneOfThese': 'None of These',
  };
  
  return formatMap[condition] || condition.charAt(0).toUpperCase() + condition.slice(1);
}; 