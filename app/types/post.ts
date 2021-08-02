export default class Post {
  ModelId: number
  ModelObj: object | null
  getModelId (): number {
    return this.ModelId
  }

  getModelObj (): object | null {
    return this.ModelObj
  }

  private title: string
  private body: string
  private category: string
  private tag: object | null
  private author: string
  private createdAt: string
  private updatedAt: string | null

  constructor (post: Post);

  constructor (id: number, title: string, body: string, category: string, tag: object, author: string, createdAt: string, updatedAt: string);

  constructor (id: number | Post, title?: string, body?: string, category?: string, tag?: object, author?: string, createdAt?: string, updatedAt?: string) {
    if (typeof id === 'number') {
      this.ModelId = id
      this.title = title || ''
      this.body = body || ''
      this.category = category || ''
      this.tag = tag || null
      this.author = author || ''
      this.createdAt = createdAt || ''
      this.updatedAt = updatedAt || null
    } else {
      this.ModelId = id.getModelId()
      this.title = id.getTitle
      this.body = id.getBody
      this.category = id.getCategory
      this.tag = id.getTag
      this.author = id.getAuthor
      this.createdAt = id.getCreatedAt
      this.updatedAt = id.getUpdatedAt
    }
    this.ModelObj = {}
  }

  public get getTitle (): string {
    return this.title
  }

  public get getBody (): string {
    return this.body
  }

  public get getCategory (): string {
    return this.category
  }

  public get getTag (): object | null {
    return (this.tag && Object.keys(this.tag).length !== 0) ? this.tag : null
  }

  public get getAuthor (): string {
    return this.author
  }

  public get getCreatedAt (): string {
    return this.createdAt
  }

  public get getUpdatedAt (): string | null {
    return this.updatedAt || null
  }

  public get getCreatedAtF (): string {
    return this.dateFormat(this.getCreatedAt)
  }

  public get getUpdatedAtF (): string | null {
    return this.getUpdatedAt ? this.dateFormat(this.getUpdatedAt) : null
  }

  private dateFormat (date: string): string {
    if (date) { return '' }
    const obj: Date = new Date(date)

    const y = obj.getFullYear()
    const m = obj.getMonth() + 1
    const d = obj.getDate()

    return y + ' / ' + m + ' / ' + d
  }
}
