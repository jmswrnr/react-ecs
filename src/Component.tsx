import React, { useEffect, useContext } from 'react'
import { ComponentConstructor } from 'ecsy'

import { EntityContext } from './Entity'

type Props = {
  ctor: ComponentConstructor<any>
  initialValues?: object
}

const Component: React.FunctionComponent<Props> = ({
  ctor,
  children,
  initialValues,
}) => {
  const entity = useContext(EntityContext)
  useEffect(() => {
    if (entity) {
      entity.addComponent(ctor, initialValues)

      return () => {
        entity.removeComponent(ctor)
      }
    }
  }, [])
  return <>{children}</>
}

export default Component
