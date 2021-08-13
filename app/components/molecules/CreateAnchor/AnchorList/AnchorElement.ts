export default interface AnchorElement {
  tag?: string,
  id?: string,
  text?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children: Array<AnchorElement>
}
