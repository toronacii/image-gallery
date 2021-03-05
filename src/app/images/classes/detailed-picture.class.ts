export class DetailedPicture {

  tags: string[] = [];

  constructor(
    public author: string,
    public camera: string,
    tags: string,
    public url: string) {

    this.tags = (tags || '')
      .split(' ')
      .filter(tag => tag)
      .map(tag => tag.trim())
  }
}