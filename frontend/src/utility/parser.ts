

class ParserHTML {
    // private htmlElementSTR
    // constructor(htmlElementSTR:string) {
    //     this.htmlElementSTR = htmlElementSTR
    // }
    public insertHTML(parentHTMLElement: HTMLElement ,htmlElementSTR: string, place: InsertPosition = 'beforeend') {
        // const parentHTMLElement = this.render(parentHTMLSTR)
        // console.log(parentHTMLElement)
        parentHTMLElement.insertAdjacentHTML(place, htmlElementSTR);
    }
    public appendChild(container: HTMLElement, child: HTMLElement) {
        return container.appendChild(child)
    }
    public render(htmlSTR: string): HTMLElement  {
        const parserHtml = new DOMParser()
        // console.log(parserHtml);
        
        const parseDocument: Document = parserHtml.parseFromString(htmlSTR.toString(), "text/html")
        const domElement =  parseDocument.body.children[0]
        return domElement as HTMLElement
    }
}

const parser = new ParserHTML()
export {ParserHTML, parser}