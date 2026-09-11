'use client'

import { createContext, useContext, useState } from 'react'

type BannerCtx = { visible: boolean; dismiss: () => void }

const BannerContext = createContext<BannerCtx>({ visible: true, dismiss: () => {} })

export function BannerProvider({
  children,
  initialVisible = true,
}: {
  children: React.ReactNode
  initialVisible?: boolean
}) {
  const [visible, setVisible] = useState(initialVisible)
  return (
    <BannerContext.Provider value={{ visible, dismiss: () => setVisible(false) }}>
      {children}
    </BannerContext.Provider>
  )
}

export const useBanner = () => useContext(BannerContext)
