import parse from 'html-react-parser'
type Element = ReturnType<typeof parse>

export const parseHTML = (text:string): Element => {
    return parse(text)
}