import vnode from "./vnode";
import createElment from "./createElment";

export default function (oldVnode, newVnode) {
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        console.log('same node')
    } else {
        console.log('not same node')
        let newVnodeElm = createElment(newVnode)
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}