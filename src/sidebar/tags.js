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

       // -------------------
	   const tagNames = [
		{ display: 'HTML', css: 'html' },
		{ display: 'CSS', css: 'css' },
		{ display: 'JavaScript', css: 'javascript' },
		{ display: 'C++', css: 'cpp' },
		{ display: 'Java', css: 'java' },
		{ display: 'Python', css: 'python' }
		];

		tagNames.forEach(tag => {
			const tagElement = document.createElement('tag-element');
			tagElement.setAttribute('tag-name', tag.css);
			tagElement.textContent = tag.display;
			container.appendChild(tagElement);
		});
        // -------------------

        /** 
        //creating the tags(buttons) and adding them to the container
        const tagCount = parseInt(this.getAttribute('count'))|| 6;
        for(let i = 0; i < tagCount; i++){
            const tagElement = document.createElement('tag-element');
            tagElement.textContent = `Tag ${i}`;

            //adding click functionality => on click, calls toggleLocation()
            //tagElement.addEventListener('click', this.toggleState.bind(this));
            container.appendChild(tagElement);
        }
        */

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


        // -----
        button.textContent = this.textContent;
        // -------
        
        /**
        //temp tag text content
        button.textContent = `Tag`;
        */


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

			/** revise coding style */ 
			/** hex values might change for c++, java, and/or python later (preference) */ 
			button.inactive.css { background-color: #6dc0ff; }
            		button.active.css { background-color: #3baaff; }

			button.inactive.html { background-color: #ff9b72; }
			button.active.html { background-color: #eb8156; }

			button.inactive.javascript { background-color: #ffd666; }
			button.active.javascript { background-color: #ffc37d; }
			
			button.inactive.cpp { background-color: #c192ff; }
			button.active.cpp { background-color: #8b68b8; }
			
			button.inactive.python { background-color: #718cc0; }
			button.active.python { background-color: #45597e; }

			button.inactive.java { background-color: #ff593a; }
			button.active.java { background-color: #c85844; } 
        `;
        this.shadowRoot.appendChild(style);

        //creating isActive property and initializing isActive
        //(false == inactive) (true == active)
        this.isActive = false;
        this.setLocationClass();

        // -----
        const tagName = this.getAttribute('tag-name');
        button.classList.add(tagName);
        button.classList.add('inactive');
        // -------
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

        // -----
        const tagName = this.getAttribute('tag-name');
        // -----

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
