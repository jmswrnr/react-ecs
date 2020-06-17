import Component from './Component'
import { ComponentConstructor } from 'ecsy'
import React, { useRef, createElement } from 'react'

export class DOMElementComponent {
  ref: React.RefObject<HTMLElement> | null = null
  reset() {
    this.ref = null
  }
}

type Props = React.HTMLAttributes<HTMLElement> & {
  type: string
  constructor: ComponentConstructor<DOMElementComponent>
}

const DOMElement: React.FunctionComponent<Props> = ({
  type,
  children,
  constructor,
  ...extraProps
}) => {
  const ref = useRef()
  return createElement(
    type,
    { ...extraProps, ref },
    <Component ctor={constructor} initialValues={{ ref }}>
      {children}
    </Component>
  )
}

export default DOMElement
