import vnode from "./vnode";
import createElment from "./createElment";

export default function (oldVnode, newVnode) {
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        console.log('same node')
        if (oldVnode === newVnode) return
        if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
            if (newVnode.text != oldVnode.text) {
                oldVnode.elm.innerText = newVnode.text
            }
        } else {
            if (oldVnode.children != undefined && oldVnode.children.length > 0) {

            } else {
                oldVnode.elm.innerText = ''
                for (let i = 0; i < newVnode.children.length; i++) {
                    let dom = createElment(newVnode.children[i])
                    oldVnode.elm.appendChild(dom)

                }
            }
        }
    } else {
        console.log('not same node')
        let newVnodeElm = createElment(newVnode)
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}