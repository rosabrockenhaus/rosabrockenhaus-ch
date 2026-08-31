export type Product = {
  id: number
  name: string
  price: number
  category: string
  badge: string
  description?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Lucite Vitrine, Bogenform',
    price: 280,
    category: 'Möbel',
    badge: 'Unikat',
    description: 'Elegante Vitrine aus Lucite mit geschwungenem Bogen. Perfekt für Wohnzimmer oder Büro.',
  },
  {
    id: 2,
    name: 'Korg M1 Synthesizer',
    price: 400,
    category: 'Elektronik',
    badge: 'Vintage',
    description: 'Klassischer Workstation-Synthesizer aus den 1990er Jahren. Vollständig funktionsfähig.',
  },
  {
    id: 3,
    name: 'Glamour Home-Bar',
    price: 350,
    category: 'Möbel',
    badge: 'Unikat',
    description: 'Stilvolle Hausbar mit Glashalterung und Spiegel. Ein echter Hingucker.',
  },
  {
    id: 4,
    name: 'Kommode 4 Schubladen',
    price: 120,
    category: 'Möbel',
    badge: 'Unikat',
    description: 'Solide Holzkommode mit vier geräumigen Schubladen. Zeitloses Design.',
  },
  {
    id: 5,
    name: 'Lucite Rollwagen',
    price: 90,
    category: 'Möbel',
    badge: 'Unikat',
    description: 'Praktischer Rollwagen aus Lucite. Ideal als Beistelltisch oder für die Küche.',
  },
  {
    id: 6,
    name: 'Vintage Stehlampe',
    price: 65,
    category: 'Leuchten',
    badge: 'Vintage',
    description: 'Charaktervolle Stehlampe im Retro-Stil. Mit neuer Glühbirne ausgestattet.',
  },
  {
    id: 7,
    name: 'Chesterfield Sessel',
    price: 220,
    category: 'Möbel',
    badge: 'Unikat',
    description: 'Bequemer Chesterfield-Sessel in dunkelgrünem Leder. Leichte Gebrauchsspuren.',
  },
  {
    id: 8,
    name: 'Porzellan Kaffeeservice',
    price: 45,
    category: 'Geschirr',
    badge: 'Unikat',
    description: '12-teiliges Kaffeeservice aus feinem Porzellan. Komplett erhalten.',
  },
]
