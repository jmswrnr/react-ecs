import React, { createContext, useContext, useEffect, useState } from 'react'
import { WorldContext } from './World'
import { Entity as EcsyEntity } from 'ecsy'

import DOMElement, { DOMElementComponent } from './DOMElement'

export const EntityContext = createContext<EcsyEntity>(null)

type Props = React.HTMLAttributes<HTMLElement> & {
  entityName?: string
  elementType?: string | false
}

const Entity: React.FunctionComponent<Props> = ({
  children,
  entityName = '',
  elementType = 'div',
  ...extraProps
}) => {
  const world = useContext(WorldContext)
  const [entity] = useState<EcsyEntity>(() => world.createEntity(entityName))

  useEffect(() => {
    return () => {
      if (entity) {
        // Remove entity from world when unmounting in React
        entity.remove()
      }
    }
  }, [entity])

  return (
    <EntityContext.Provider value={entity}>
      {elementType ? (
        <DOMElement
          {...extraProps}
          constructor={DOMElementComponent}
          type={elementType}
        >
          {children}
        </DOMElement>
      ) : (
        children
      )}
    </EntityContext.Provider>
  )
}

export default Entity
