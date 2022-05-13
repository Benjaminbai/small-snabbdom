
import h from './smallSnabbdom/h.js'
import patch from './smallSnabbdom/patch.js'

// const vn1 = h('h1', {}, 'hello')
const vn1 = h('ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, 'C'),
    h('li', {}, [
        h('div', {}, [
            h('p', {}, '1'),
            h('p', {}, '2'),
            h('p', {}, '3'),
        ])
    ]),
])

const vn2 = h('section', {}, [
    h('h1', {}, 'a'),
    h('h2', {}, 'b'),
    h('h3', {}, 'c'),
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')

patch(container, vn1)

btn.onclick = function () {
    patch(vn1, vn2)
}