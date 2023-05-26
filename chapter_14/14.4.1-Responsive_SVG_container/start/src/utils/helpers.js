import timeline from "../data/timeline.json";

export const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
};

export const radiansToDegrees = (radians) => {
  return radians * 180 / Math.PI; 
};

export const isMonthIncluded = (selectedPeriod, month, year) => {
  const relatedPeriod = timeline.find(period => period.id === selectedPeriod);
  const startDate = new Date(relatedPeriod.start_year, relatedPeriod.start_month, 1);
  const endDate = new Date(relatedPeriod.end_year, relatedPeriod.end_month, 0);

  const currentDateStart = new Date(year, month, 1);
  const currentDateEnd = new Date(year, month, 0);
  const isMonthIncluded = currentDateStart >= startDate && currentDateEnd <= endDate ? true : false;

  return isMonthIncluded;
}
export const isYearIncluded = (selectedPeriod, year) => {
  const relatedPeriod = timeline.find(period => period.id === selectedPeriod);
  const startYear = relatedPeriod.start_year;
  const endYear = relatedPeriod.end_year;

  return year >= startYear && year <= endYear ? true : false;
}