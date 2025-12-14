import { visit } from 'unist-util-visit'

export function remarkNotePlugin() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'note' && node.name !== 'warn' && node.name !== 'alert') return

      const data = node.data || (node.data = {})
      const attributes = node.attributes || {}
      
      let type = 'info'

      if (node.name === 'warn') {
        type = 'warn'
      } else if (node.name === 'alert') {
        type = 'alert'
      } else if (node.name === 'note') {
        const firstChild = node.children[0]
        // Check for :::note[label] syntax which remark-directive parses as directiveLabel
        if (firstChild?.data?.directiveLabel) {
           const labelText = firstChild.children[0]?.value || ''
           if (['info', 'warn', 'alert'].includes(labelText)) {
             type = labelText
             // Remove the label node so it doesn't render
             node.children.shift()
           }
        }
      }

      data.hName = 'Note'
      data.hProperties = {
        type: type,
        ...attributes
      }
    })
  }
}
