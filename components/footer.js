'use strict';

const footer = (props) => {
    return e(
        'footer',
        {},
        e('a', {href: 'https://github.com/limekiller/puzzlesolver'}, e('img', {src: '/images/github.svg'})),
        e('a', {href: 'https://bryceyoder.com'}, e('img', {src: '/images/bryceyoder.svg'})),
    )
}

const footerContainer = document.querySelector('#footer');
root = ReactDOM.createRoot(footerContainer);
root.render(e(footer));
