

export default class Canvas{
    constructor(private parent:HTMLElement){
        this.parent.innerHTML = '';
        this.parent.id = 'canvas';
        const newStyle: Partial<CSSStyleDeclaration> = {
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(12, 1fr)',
            height: '100vh',
            columnGap: '5px',
            rowGap: '5px',
            aspectRatio: '1 / 1'
        }
        Object.assign(this.parent.style, newStyle);
    }
}