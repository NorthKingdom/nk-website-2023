import { gql } from '@apollo/client'

export const CLIPBOARD_COPY_ITEM = gql`
  fragment clipboardCopyItem on ClipboardCopyItem {
    label
    content
    hoverLabel
    confirmationLabel
  }
`
