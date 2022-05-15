import createElement from "./createElment";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode, newVnode) {
    if (oldVnode === newVnode) return
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        if (newVnode.text != oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            // diff 算法 四种命中方式
            // 1. 新前 和 旧前
            // 2. 新后 和 旧后
            // 3. 新后 和 旧前
            // 4. 新前 和 旧后
            // 当4命中时，要移动节点，移动 新前指向的节点 到 旧前的前面
            // 当3命中时，要移动节点，移动 新前指向的节点 到 旧后到后面
            // 如果1234都没命中，会使用循环查找，找到后把旧中的这一项标记成undefined，并移动位置到 旧前 之前
            // 如果旧节点先循环完，新节点中剩余的就是要追加的
            // 如果新节点先循环完，那么包括旧前，旧后指针及中间包含的部分就是要删除的
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        } else {
            oldVnode.elm.innerText = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElment(newVnode.children[i])
                oldVnode.elm.appendChild(dom)

            }
        }
    }
}