export type AvatarColor = { r: number; g: number; b: number; a?: number }

export type Avatar = {
  userId: string
  email: string
  name: string
  hasClaimedName: boolean
  description: string
  ethAddress: string
  version: number
  avatar: {
    bodyShape: string
    snapshots: { face: string; body: string }
    eyes: { color: AvatarColor }
    hair: { color: AvatarColor }
    skin: { color: AvatarColor }
    wearables: string[]
    version: number
  }
  inventory: string[]
  tutorialStep: number
}
