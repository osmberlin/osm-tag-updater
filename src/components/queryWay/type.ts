export type Way = {
  version: '0.6'
  generator: 'CGImap 0.8.8 (1745470 spike-07.openstreetmap.org)'
  copyright: 'OpenStreetMap and contributors'
  attribution: 'http://www.openstreetmap.org/copyright'
  license: 'http://opendatacommons.org/licenses/odbl/1-0/'
  elements: [
    {
      type: 'way'
      id: number
      timestamp: string
      version: number
      changeset: number
      user: string
      uid: number
      nodes: number[]
      tags: { [key: string]: string }
    }
  ]
}
