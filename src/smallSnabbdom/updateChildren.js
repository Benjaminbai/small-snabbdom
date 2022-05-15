import patchVnode from "./patchVnode"
import createElement from "./createElment"

function checkSameVnode(a, b) {
    return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
    // diff 算法 四种命中方式
    // @1@ 新前 和 旧前
    // @2@ 新后 和 旧后
    // @3@ 新后 和 旧前
    // @4@ 新前 和 旧后
    // 当@4@命中时，要移动节点，移动 新前指向的节点 到 旧前的前面
    // 当@3@命中时，要移动节点，移动 新前指向的节点 到 旧后到后面
    // 如果1234都没命中，会使用循环查找，找到后把旧中的这一项标记成undefined，并移动位置到 旧前 之前
    // 如果旧节点先循环完，新节点中剩余的就是要追加的
    // 如果新节点先循环完，那么包括旧前，旧后指针及中间包含的部分就是要删除的
    console.log(parentElm)
    console.log(oldCh, newCh)

    // 旧前
    let oldStartIdx = 0
    // 新前
    let newStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新后
    let newEndIdx = newCh.length - 1

    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 新前节点
    let newStartVnode = newCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]

    let keyMap = null

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newStartVnode)) { // @1@
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) { // @2@
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) { // @3@
            patchVnode(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) { // @4@
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldCh[i].key;
                    if (key != undefined) {
                        keyMap[key] = i
                    }
                }
            }
            const idxInOld = keyMap[newStartVnode.key]
            if (idxInOld == undefined) {
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                const elmToMove = oldCh[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                oldCh[idxInOld] = undefined
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
            }

            newStartVnode = newCh[++newStartIdx]
        }
    }

    if (newStartIdx <= newEndIdx) {
        console.log('there are new nodes left')
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)

        }
    } else if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }

        }
    }
}