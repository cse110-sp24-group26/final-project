class EditorTools extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow( {mode : "open"});
        shadow.innerHTML = `
            <button id = "bold-button"><b>B</b></button>
            <button id = "italic-button"><i>I</i></button>
            <button id = "header-button">H</button>
        `;
            //figure out a click counter so when buttons are clicked twice it undo-s the bold/italic/header
            const boldButton = shadow.querySelector('#bold-button');
            const italicButton = shadow.querySelector('#italic-button');
   
            boldButton.addEventListener('click', (event) => {
                event.preventDefault();
                const mainEditor = document.querySelector('m-main-editor');
                const textArea = mainEditor.querySelector('#text-content');
                console.log("button clicked");
                const text = shadow.getSelection().toString();
                console.log(text);
                const formattedText = `**${text}**`;
                console.log(formattedText);
                console.log(textArea);
                const replaced = textArea.innerHTML.replace(text, formattedText);
                textArea.innerHTML = replaced;
                selection.removeAllRanges();
            });
   
            italicButton.addEventListener('click', (event) => {
                event.preventDefault();
                const mainEditor = document.querySelector('m-main-editor');
                const textArea = mainEditor.querySelector('#text-content');
                console.log("button clicked");
                const text = shadow.getSelection().toString();
                console.log(text);
                const formattedText = `*${text}*`;
                console.log(formattedText);
                console.log(textArea);
                const replaced = textArea.innerHTML.replace(text, formattedText);
                textArea.innerHTML = replaced;
                selection.removeAllRanges();
            });

            headerButton.addEventListener('click', (event) => {
                event.preventDefault();
                const mainEditor = document.querySelector('m-main-editor');
                const textArea = mainEditor.querySelector('#text-content');
                console.log("button clicked");
                const text = shadow.getSelection().toString();
                console.log(text);
                const formattedText = `*${text}*`; //change the format to a heading syntax
                console.log(formattedText);
                console.log(textArea);
                const replaced = textArea.innerHTML.replace(text, formattedText);
                textArea.innerHTML = replaced;
                selection.removeAllRanges();
            });

    }


}


customElements.define('m-editor-tools', EditorTools);
