export function getElement(template: string) : HTMLElement {
    const parserHtml = new DOMParser()
    const parseDocument: Document = parserHtml.parseFromString(template.toString(), "text/html")
    const domElement =  parseDocument.body.children[0]
    return domElement as HTMLElement
}
