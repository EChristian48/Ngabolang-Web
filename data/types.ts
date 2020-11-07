export class User {
  constructor(
    public uid: string,
    public username: string,
    private favorites: Post[] = []
  ) {}

  removeFavorites(id: string) {
    this.favorites = this.favorites.filter(post => post.id !== id)
  }
}

export type Post = {
  id: string
  uid: string
  username: string
  url: string
  location: string
}
