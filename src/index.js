
import h from './smallSnabbdom/h.js'
import patch from './smallSnabbdom/patch.js'

// const vn1 = h('h1', {}, 'hello')
const vn1 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E'),
])

const vn2 = h('ul', {}, [
    h('li', { key: 'QQQ' }, 'QQQ'),
    h('li', { key: 'C' }, 'C'),
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')

patch(container, vn1)

btn.onclick = function () {
    patch(vn1, vn2)
}