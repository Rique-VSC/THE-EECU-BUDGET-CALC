// @ts-check
const page_view = /** @type {HTMLDivElement} */ (document.querySelector('.current-page'));
let current_page_number = 0;
const templates = [...document.querySelectorAll('template')];
const contBtn = (document.querySelector('#cont'));
const backBtn = (document.querySelector('#back'));

//Next and back buttons are still a bit finicky, but they work
function next_page() {
    if (current_page_number >= templates.length) return;
    const fragment = templates[current_page_number++].content.cloneNode(true);
    page_view.replaceChildren(fragment);
}

function back_page() {
    if (current_page_number <= 0) return;
    const fragment = templates[--current_page_number].content.cloneNode(true);
    page_view.replaceChildren(fragment);
}


next_page();

contBtn.addEventListener('click', next_page );
backBtn.addEventListener('click', back_page);