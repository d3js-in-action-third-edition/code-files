const getRandomSalary = (salary) => {
  const lowerLimit = +salary.slice(1, salary.indexOf(" -")).replace(",", "");
  const upperLimit = +salary.slice(salary.indexOf(" $") + 2).replace(",", "");
  
  return Math.floor(Math.random() * (upperLimit - lowerLimit) + lowerLimit);
}

// Load data
d3.csv("../data/data.csv", d => {
  if (d.pay_annual_USD !== "$240,000 or more") {
    return {
      role: d.role,
      gender: d.gender,
      salary: getRandomSalary(d.pay_annual_USD)
    };
  }
}).then(data => {
  drawHistogram(data);
  populateFilters(data);
});