interface PlayListFormat {
    id: number,
    name: string,
    createdAt: Date,
    user: {
      id: number,
      username: string,
      firstName: string,
      lastName: string
    },
    songs: []
}
export { PlayListFormat }