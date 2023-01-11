document.querySelector('header').addEventListener('click', (e) => {
    e.target.classList.add('hidden');
})
document.querySelector('.menuToggle').addEventListener('click', (e) => {
    document.querySelector('header').classList.remove('hidden')
})