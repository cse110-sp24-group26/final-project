
class MainEditor extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<p id="line-num">1</p>
			<iframe id="text-editor"></iframe>
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
			div.setAttribute('contenteditable', "true");
			iframeDoc.body.appendChild(div);
			div.addEventListener('keyup', update)
		})

		function update() {
			let iframeDoc = iframe.contentDocument;
			let div = iframeDoc.getElementsByTagName('div')[0];
			let text = div.textContent;
			let changed = false;
			if (text.includes("__")){
				console.log(text)
				let m = text.match(/__.+__/);
				let new_text = `<b>` + m + `</b>`
				text = text.replace(m, new_text)
				console.log(div.innerHTML)
				changed = true;
			}
			if (changed == true){
				div.innerHTML = text;
			}
		}
	}
}

customElements.define('m-main-editor', MainEditor);
