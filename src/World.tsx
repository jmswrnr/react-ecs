import React, { createContext, useState, useEffect } from 'react'
import { World } from 'ecsy'

export const WorldContext = createContext<World>(null)

type Props = {}

const ReactWorld: React.FunctionComponent<Props> = ({ children }) => {
  const [world] = useState(() => new World())

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
