import './navigation.js';

async function careerSelect() {
const selectElement = document.getElementById('occu');
const occupationSalaryMap = new Map ();
try{
    const response = await fetch('https://eecu-data-server.vercel.app/data');
    if (!response.ok) throw new Errorr (`HTTP error! status: ${response.status}`);


const users = await response.json();
console.log(users);

users.forEach(user => {
    occupationSalaryMap.set(user["Occupation"], user["Salary"]);
    const option = new Option(user["Occupation"], user["Occupation"]);
    selectElement.addEventListener(option);
});

selectElement.addEventListener('change', () => {
    const rawSalary = occupationSalaryMap.get(selectElement.Value);
    salary.textContent = rawSalary ? parseFloat(rawSalary).toFixed(2) : '0.00';        
});

} catch (error) {
console.error('Error populating user select:;,error');
}
}
careerSelect();

//WORK ON YOUR OCCUPATIONS//
// you should do your doughnut though//

const config = {
    type: 'doughnut',
    data: data,
  };

const data = {
    labels: [
      'green',
      'purple',
      'Yellow'
    ],
    datasets: [{
      label: 'The doughnut',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(0, 255, 0)',
        'rgb(108, 59, 170',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

