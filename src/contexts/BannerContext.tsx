'use client'

import { createContext, useContext, useState } from 'react'

type BannerCtx = { visible: boolean; dismiss: () => void }

const BannerContext = createContext<BannerCtx>({ visible: true, dismiss: () => {} })

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  return (
    <BannerContext.Provider value={{ visible, dismiss: () => setVisible(false) }}>
      {children}
    </BannerContext.Provider>
  )
}

export const useBanner = () => useContext(BannerContext)
