import AnchorElement from './AnchorElement'

export default class AnchorList {
  private dom : string
  private tags : string = 'h1,h2,h3'

  constructor (dom : string)
  constructor (dom : string, tags : string)
  constructor (dom : string, tags? : string) {
    this.dom = dom
    if (typeof tags === 'string') {
      this.tags = tags
    }
  }

  public setTags (tags : string) {
    this.tags = tags
  }

  public getList (tags? : string) : Array<AnchorElement> {
    const selector = typeof tags === 'string' ? tags : this.tags
    const list : Array<AnchorElement> = []

    if (this.dom !== '') {
      const elements : Array<RegExpMatchArray> = [...this.dom.matchAll(this.createRegExp(selector))]
      elements.forEach((elem : RegExpMatchArray) => list.push(this.setAnchorElement(elem)))
    }

    return list
  }

  public getTree (tags? : string) :Array<AnchorElement> {
    const selector = typeof tags === 'string' ? tags : this.tags
    const list : Array<AnchorElement> = this.getList(selector)
    const treeList : Array<AnchorElement> = []
    let ref = treeList

    if (list.length > 0) {
      const tags : Array<string> = [...new Set<string>(selector.split(','))]
      const nodeExists : Array<boolean> = []
      tags.forEach(() => nodeExists.push(false))

      list.forEach((elem : AnchorElement) => {
        if (!elem.tag) { return }
        const index = tags.indexOf(elem.tag)
        for (let i = 0; i < tags.length; i++) {
          if (index === i) {
            ref.push(elem)
            nodeExists[i] = true
            ref = treeList
          } else if (index > i) {
            if (!nodeExists[i]) {
              ref.push({ children: [] })
              nodeExists[i] = true
            }
            ref = ref[ref.length - 1].children
          } else {
            nodeExists[i] = false
          }
        }
      })
    }

    return treeList
  }

  private createRegExp (tags : string) : RegExp {
    let regexpTag : string = ''
    new Set<string>(tags.split(',')).forEach((tag : string) => {
      regexpTag = regexpTag + '|' + tag
    })
    regexpTag = regexpTag.slice(1)
    return new RegExp('<(' + regexpTag + ')[^>]+?id="(.+?)".*?>(.*?)</(?:' + regexpTag + ')>', 'ig')
  }

  private setAnchorElement (elem : RegExpMatchArray) : AnchorElement {
    return {
      tag: elem[1],
      id: elem[2],
      text: elem[3],
      children: []
    }
  }
}
