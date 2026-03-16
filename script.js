

async function careerSelect() {

const selectElement = document.getElementById('occu');
const salary = document.getElementById("salary");

if (!selectElement || !salary) return;

const occupationSalaryMap = new Map();
try {
const response = await fetch('https://eecu-data-server.vercel.app/data');

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const users = await response.json();

users.forEach(user => {
occupationSalaryMap.set(user["Occupation"], user["Salary"]);
const option = new Option(user["Occupation"], user["Occupation"]);

selectElement.appendChild(option);

});


// saved data// 
const savedOccupation = localStorage.getItem("occupation");
const savedSalary = localStorage.getItem("salary");

if (savedOccupation) selectElement.value = savedOccupation;
if (savedSalary) salary.textContent = parseFloat(savedSalary).toFixed(2);


selectElement.addEventListener('change', () => {
const rawSalary = occupationSalaryMap.get(selectElement.value);

salary.textContent = rawSalary
? parseFloat(rawSalary).toFixed(2)
: '0.00';

localStorage.setItem("salary", rawSalary);
localStorage.setItem("occupation", selectElement.value);
});

} catch (error) {

console.error(error);

}
}

careerSelect();
// saved salary//
const savedsalary = Number(localStorage.getItem("salary")) || 0;

page_view.replaceChildren(...fragment.childNodes);



// you should do your doughnut though//
// I did my doughnut though//
//oh//

const data = {
    labels: [
      'housing',
      'Essential',
      'Savings',
      'Salary'
    ],
    datasets: [{
      label: 'The doughnut',
      data: [300, 200, 100, salary],
      backgroundColor: [
        'rgb(0, 255, 0)',
        'rgb(108, 59, 170)',
        'rgb(255, 205, 86)',
        'rgb(255, 99, 132)'
      ],
      hoverOffset: 4
    }]
  };

  const config = {
    type: 'doughnut',
    data: data
  };

const templates = [...document.querySelectorAll('template')];



