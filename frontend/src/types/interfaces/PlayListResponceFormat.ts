interface PlayListResponceFormat    {
        name: string,
        user: {
          id: number,
          username: string
        },
        id: number,
        createdAt: Date
      }
      export { PlayListResponceFormat }