import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const imgData = readFileSync(
    join(process.cwd(), 'public/media/rosa-brockenhaus-bern-moebel-wohnen-secondhand-1.jpg')
  )
  const imgSrc = `data:image/jpeg;base64,${imgData.toString('base64')}`

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: 'system-ui, sans-serif' }}>

        {/* Left — brand panel */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '58%',
          padding: '64px',
          background: 'linear-gradient(145deg, #993556 0%, #72243E 55%, #1a0f14 100%)',
        }}>

          {/* Top: icon + wordmark + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L30 14H27V30H5V14H2L16 2Z" fill="white" />
                <path d="M12 30V23C12 20.79 13.79 19 16 19C18.21 19 20 20.79 20 23V30H12Z" fill="#993556" />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'white', fontSize: '44px', fontWeight: 700, lineHeight: 1 }}>Rosa</span>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '26px', fontWeight: 400, lineHeight: 1.2 }}>Brockenhaus</span>
              </div>
            </div>

            <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '30px', lineHeight: 1.45, fontWeight: 400 }}>
              Neues Leben für Gegenstände —{'\n'}neue Chancen für Menschen.
            </span>
          </div>

          {/* Bottom: badges + url */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '8px 22px',
                borderRadius: '999px',
                fontSize: '18px',
                fontWeight: 600,
              }}>50% auf alles</span>
              <span style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.8)',
                padding: '8px 22px',
                borderRadius: '999px',
                fontSize: '18px',
              }}>Gemeinnütziger Verein · Bern</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
              rosabrockenhaus.ch · Wankdorffeldstrasse 96, 3014 Bern
            </span>
          </div>
        </div>

        {/* Right — shop photo */}
        <div style={{ width: '42%', display: 'flex', position: 'relative' }}>
          <img src={imgSrc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(114,36,62,0.55) 0%, transparent 45%)',
          }} />
        </div>

      </div>
    ),
    { ...size }
  )
}
