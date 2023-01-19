'use strict';

const e = React.createElement;

const header = (props) => {
    const [hidden, sethidden] = React.useState(false)

    const pages = [
        {
            name: 'spellingbee',
            displayName: 'Spelling Bee',
            link: '/'
        },
        {
            name: 'letterboxed',
            displayName: 'Letter Boxed',
            link: '/letterboxed/'
        },
        {
            name: 'sudoku',
            displayName: 'Sudoku',
            link: '/sudoku/'
        }
    ]

    return [
        e(
            'button',
            {className: 'title menuToggle', onClick: () => sethidden(!hidden)},
            e('img', {src: '/images/puzzle.svg'}),
            'Puzzle Menu'
        ),
        e(
            'header',
            {className: hidden ? 'hidden' : ''},
            e('button', {onClick: () => sethidden(!hidden), className: 'closeButton'}, '✖'),
            pages.map(page => {
                return e(
                    'a',
                    {
                        className: `
                            headerLink
                            ${window.location.pathname == page.link ? 'active' : ''}
                        `, 
                        href: page.link,
                        key: page.name
                    },
                    e('img', {src: `/images/${page.name}.svg`}),
                    e('span', {}, page.displayName)
                )
            })
        )
    ]
}

const headerContainer = document.querySelector('#header');
let root = ReactDOM.createRoot(headerContainer);
root.render(e(header));

