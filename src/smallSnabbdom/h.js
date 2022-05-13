import vnode from "./vnode";

export default function (sel, data, c) {
    if (arguments.length != 3) {
        throw new Error('h params must be three')
    }

    if (typeof c == 'string' || typeof c == 'number') {
        return vnode(sel, data, [], c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('error')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('params three wrong')
    }

}