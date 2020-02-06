export type ProfileData = {
  firstname: string
  lastname: string
  email: string
  referenceCode: string
  ticketType: string
}

export type NetworkingProfile = {
  firstname: string
  lastname: string
  badge: number
  networks: Network[]
  bio: string
}

export type Network = {
  uid: string
  name: string
  badge: number
}
