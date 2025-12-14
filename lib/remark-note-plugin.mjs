import { visit } from 'unist-util-visit'

const ALIASES = {
  // abstract
  abstract: 'abstract',
  summary: 'abstract',
  tldr: 'abstract',
  // info
  info: 'info',
  // todo
  todo: 'todo',
  // tip
  tip: 'tip',
  hint: 'tip',
  important: 'tip',
  // success
  success: 'success',
  check: 'success',
  done: 'success',
  // question
  question: 'question',
  help: 'question',
  faq: 'question',
  // warning
  warning: 'warning',
  warn: 'warning',
  attention: 'warning',
  caution: 'warning',
  // failure
  failure: 'failure',
  missing: 'failure',
  fail: 'failure',
  // danger
  danger: 'danger',
  error: 'danger',
  // bug
  bug: 'bug',
  // example
  example: 'example',
  // quote
  quote: 'quote',
  cite: 'quote',
  // default
  note: 'note',
  // alert logic mapped to warning or danger? 
  // User prev implementation had 'alert' -> 'alert' type. 
  // Let's keep 'alert' as distinct or map to 'danger'?
  // The new image doesn't show "alert". It shows "Failure" and "Danger".
  // "Warning" is orange. "Failure" is red. "Danger" is red (maybe darker?).
  // Let's assume 'alert' from previous request is closest to 'failure' or keep as legacy.
  // Actually, let's keep 'alert' as a valid type if the user still uses it, mapping to 'failure' (red) or its own.
  // The prompt says "Img contains all". Image has "Failure", "Danger".
  // Let's map `alert` to `failure` for consistency with standard sets, or `warning`?
  // Previous code: alert = red. Failure = red.
  // Let's aliases `alert` to `failure`.
  alert: 'failure'
}

export function remarkNotePlugin() {
  return (tree) => {
    visit(tree, 'containerDirective', (node) => {
      // Check if the directive name is in our alias list
      let alias = ALIASES[node.name]
      
      // If not a direct match, check if it's the `note` directive with a label
      let type = alias || 'note' // default to note if we are checking inside `note`

      if (!alias && node.name !== 'note') return

      const data = node.data || (node.data = {})
      const attributes = node.attributes || {}
      
      // Logic for :::note[type]
      if (node.name === 'note') {
        const firstChild = node.children[0]
        if (firstChild?.data?.directiveLabel) {
           const labelText = firstChild.children[0]?.value || ''
           if (ALIASES[labelText]) {
             type = ALIASES[labelText]
             node.children.shift()
           }
        } else if (alias) {
            // direct use like :::info (mapped to note name but has alias)
            // Wait, if node.name is 'info', alias is 'info'.
            // If node.name is 'note', alias is 'note'.
            type = alias
        }
      } else {
        // e.g. :::warn
        type = alias
      }

      data.hName = 'Note'
      data.hProperties = {
        type: type,
        ...attributes
      }
    })
  }
}
