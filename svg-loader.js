class SVGLoader extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        if(this.childNodes.length){ return undefined; }
        const self = this;
        const src = this.getAttribute('src');
        if(!src){ return false; }
        fetch(src).then(response =>{
            if (!response.ok){ throw new Error(`HTTP error! status: ${response.status}`); }
            return response.text();
        }).then(svg => {
            const template = document.createElement('template');
            template.innerHTML = svg;
            self.appendChild(template.content.cloneNode(true));
        }).catch(error => { console.error("Error fetching src:", error); });
    }
}
customElements.define('svg-loader', SVGLoader);
