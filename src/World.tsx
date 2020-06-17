import React, { createContext, useState, useEffect } from 'react'
import { World } from 'ecsy'

export const WorldContext = createContext<World>(null)

export interface WorldConstructor<T extends World> {
  new (...args: any): T;
}

type Props = {
  ctor: WorldConstructor<any>
}

const ReactWorld: React.FunctionComponent<Props> = ({ children, ctor }) => {
  const [world] = useState(() => new ctor())

  useEffect(() => {
    // Init World
    let lastTime = performance.now()
    let active = true

    const loop = () => {
      if (!active) {
        return
      }

      const time = performance.now()
      const delta = time - lastTime

      // Run all the systems
      world.execute(delta, time)

      lastTime = time

      requestAnimationFrame(loop)
    }

    loop()

    return () => {
      // Cleanup World
      active = false
    }
  }, [])

  return <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
}

export default ReactWorld
