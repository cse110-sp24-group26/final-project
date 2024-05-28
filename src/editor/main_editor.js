
class MainEditor extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<p id="line-num">1</p>
			<div contenteditable="true" id="text-editor">
			</div>
		`;

		this.style.display = "flex"

		let p = document.getElementById('line-num');
		p.style.margin = "0"
		p.style.fontSize = "12px";
		p.innerText

		let iframe = document.getElementById("text-editor")
		iframe.style.width = "100%"

		iframe.addEventListener("load", () => {
			let iframeDoc = iframe.contentDocument;
			let div = iframeDoc.createElement('div');
			div.style.height = "100%"
			div.setAttribute('contenteditable', "true");
			iframeDoc.body.appendChild(div);
		})

		/*function update() {
			render();
		}

		function removeStyleTags(text){
			return text.replace('</.b>', "")
		}

		/*function render(){
			let iframeDoc = iframe.contentDocument;
			let div = iframeDoc.getElementsByTagName('div')[0];
			let text = div.innerHTML;
			text = removeStyleTags(text);
			console.log(text);
			if (text.includes("__")){
				console.log(text);
				console.log(div.innerHTML);
				let m = text.match(/__.+__/);
				let new_text = `<b>` + m + `</b>`;
				text = text.replace(m, new_text);
				div.innerHTML = text;
			}
		}*/
	}
}

customElements.define('m-main-editor', MainEditor);
