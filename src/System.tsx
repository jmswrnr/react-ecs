import React, { useEffect, useContext } from 'react'
import { System as EcsySystem, SystemConstructor } from 'ecsy'

import { WorldContext } from './World'

type Props = {
  ctor: SystemConstructor<EcsySystem>
  initialAttributes?: object
}

const System: React.FunctionComponent<Props> = ({
  ctor,
  children,
  initialAttributes,
}) => {
  const world = useContext(WorldContext)

  useEffect(() => {
    world.registerSystem(ctor, initialAttributes)

    return () => {
      world.unregisterSystem(ctor)
    }
  }, [])
  return <>{children}</>
}

export default System
