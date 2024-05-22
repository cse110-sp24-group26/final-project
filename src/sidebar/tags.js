class Tags extends HTMLElement {
	connectedCallback() {
		//Attaching shaw root to the element
        this.attachShadow({mode: 'open'});

		//adding title header + line break to tags feature
		const tagFeatureHeader = document.createElement('p');
		tagFeatureHeader.textContent='Tags'; 
		this.shadowRoot.append(tagFeatureHeader);

        //creating div container to hold the tags (buttons)
        const container = document.createElement('div');
        container.setAttribute('class', 'tag-container');


        //creating the tags(buttons) and adding them to the container
        const tagCount = parseInt(this.getAttribute('count'))|| 6;
        for(let i = 0; i < tagCount; i++){
            const tagElement = document.createElement('tag-element');
            tagElement.textContent = `Tag ${i}`;

            //adding click functionality => on click, calls toggleLocation()
            //tagElement.addEventListener('click', this.toggleState.bind(this));
            container.appendChild(tagElement);
        }

        //adding container to shadow root
        this.shadowRoot.append(container);

        //style content (TO BE IMPLEMENTED LATER) 
        const style = document.createElement('style');
        style.textContent = `
            .tag-container {
                width: 100%; /* need to change according to sidebar size */
                background-color: #fff;
                border: 0.0625rem solid #adb3c9; /* 1px */
                padding: 0.625rem; /* 10px */
                box-sizing: border-box; 
                display: flex;
                flex-wrap: wrap;
                gap: 0.625rem; /* 10px */
             }
        `;
        this.shadowRoot.append(style);
	}
}
class Tag extends HTMLElement{
    connectedCallback(){
        //tag element is represented by a button

        //attaching shadow root to the element
        this.attachShadow({mode:'open'}); 
        const button = document.createElement('button');

        //temp tag text content
        button.textContent = `Tag`;


        //adding click functionality => on click, calls toggleState()
        button.addEventListener('click', this.toggleState.bind(this));

        //provides prompt to change tag name upon double click
        button.addEventListener('dblclick', () =>{
            this.changeTag();
        });

        //adding button to shadowRoot
        this.shadowRoot.appendChild(button);

        //style content (TO BE IMPLEMENTED LATER) 
        const style = document.createElement('style');
        style.textContent = `
            .inactive {
                justify-content: flex-start;
                color: red;
            }
            .active {
                justify-content: flex-end;
                color: green;
            }
            button {
                font-family: 'Cambria', sans-serif;
                padding: 0.3125rem 0.625rem; /* 5px 10px */
                border-radius: 0.8rem; /* 5px */
                color: #fff;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover{
                background-color: #bbb;
            }
        `;
        this.shadowRoot.appendChild(style);

        //creating isActive property and initializing isActive
        //(false == inactive) (true == active)
        this.isActive = false;
        this.setLocationClass();
    }

    toggleState(){
        //alternates between isActive on each click
        this.isActive = this.isActive === false? true:false;
        this.setLocationClass()
    }

    //updates each tag's class (active/inactive) based on isActive
    setLocationClass(){

        //enables updating button class updating
        const shadow = this.shadowRoot;
        const button = shadow.querySelector('button');

        if(this.isActive === false){
            this.classList.add('inactive');
            this.classList.remove('active');

            button.classList.add('inactive');
            button.classList.remove('active');
        }
        else{
            this.classList.add('active');
            this.classList.remove('inactive');

            button.classList.add('active');
            button.classList.remove('inactive');
        }
    }

    //STILL UNDER DEVELOPMENT
    //called to change tag text after a double click
    changeTag() {
        const shadow = this.shadowRoot;
        const button = shadow.querySelector('button');

        const newText = prompt("Enter the new text for the tag:");
        if (newText !== null) { // Check if user canceled the prompt
            button.textContent = newText;
        }
    }
}
customElements.define('tag-element', Tag);
customElements.define('m-tags', Tags);
