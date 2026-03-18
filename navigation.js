// @ts-check
const page_view = /** @type {HTMLDivElement} */ (
    document.querySelector('.current-page')
);

/** @type {number} */
let current_page_number = /** @type {any} */ (undefined);

const templates = [...document.querySelectorAll('template')];

const continue_button = /** @type {HTMLButtonElement} */ (
    document.querySelector('#cont')
);

const back_button = /** @type {HTMLButtonElement} */ (
    document.querySelector('#back')
);

const [...nav_progress] = document.querySelectorAll('nav > hr');

/**
* @param {number} page
*/
function navigate(page) {
    if (page === current_page_number || page < 0 || page > templates.length - 1) {
        return;
    }

    let template = templates[current_page_number = page];
    const fragment = template.content.cloneNode(true);
    page_view.replaceChildren(...fragment.childNodes);

    page_view.id = template.className;

    for (const elem of nav_progress) {
        elem.classList.remove('fulfilled');
        elem.previousElementSibling?.classList.remove('fulfilled');
    }

    for (let i = 0; i < page; i++) {
        nav_progress[i]?.classList.add('fulfilled');
        nav_progress[i]?.previousElementSibling?.classList.add('fulfilled');
    }

    // load saved values
    const inputs = page_view.querySelectorAll('input');
    inputs.forEach((input, i) => {
        const savedValue = localStorage.getItem(`expense_${current_page_number}_${i}`);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });

    // pie chart
    if (template.className.includes("summary")) {

        const canvas = document.getElementById('pie');

        if (canvas) {
            const ctx = canvas.getContext('2d');

            const housing = Number(localStorage.getItem("expense_1_0")) || 0;
            const essentials = Number(localStorage.getItem("expense_2_0")) || 0;
            const savings = Number(localStorage.getItem("expense_4_0")) || 0;
            const salary = Number(localStorage.getItem("salary")) || 0;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Housing', 'Essentials', 'Savings', 'Salary'],
                    datasets: [{
                        data: [housing, essentials, savings, salary],
                        backgroundColor: [
                            'rgb(0, 255, 0)',
                            'rgb(108, 59, 170)',
                            'rgb(255, 205, 86)',
                            'rgb(255, 99, 132)'
                        ]
                    }]
                }
            });

            
            const totalExpenses = housing + essentials + savings;
            const remaining = salary - totalExpenses;

            const remainingText = document.getElementById('remaining');

            if (remainingText) {
                remainingText.textContent = `Remaining: $${remaining.toFixed(2)}`;

                if (remaining < 0) {
                    remainingText.style.color = 'red';
                } else {
                    remainingText.style.color = '';
                }
            }
        }
    }
}

navigate(0);

back_button.addEventListener('click', () => {
    navigate(current_page_number - 1);
});

continue_button.addEventListener('click', () => {
    const inputs = page_view.querySelectorAll('input');

    inputs.forEach((input, i) => {
        localStorage.setItem(`expense_${current_page_number}_${i}`, input.value);
    });

    navigate(current_page_number + 1);
});