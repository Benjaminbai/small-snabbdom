
import h from './smallSnabbdom/h.js'
import patch from './smallSnabbdom/patch.js'

// const vn1 = h('h1', {}, 'hello')
const vn1 = h('section', {}, '老的是文字')

const vn2 = h('section', {}, [
    h('p', {}, 'a'),
    h('p', {}, 'b'),
    h('p', {}, 'c'),
    h('p', {}, 'd'),
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')

patch(container, vn1)

btn.onclick = function () {
    patch(vn1, vn2)
}