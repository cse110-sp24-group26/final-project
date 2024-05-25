
class MainEditor extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<p id="line-num">1</p>
			<textarea id="text-editor"></textarea>
		`;

		this.style.display = "flex"

		let p = document.getElementById('line-num');
		p.style.margin = "0"
		p.style.fontSize = "12px";

		let textarea = document.getElementById("text-editor")
		textarea.style.fontSize = "12px";
		textarea.style.padding = "0"
		textarea.style.width = "100%"

		textarea.addEventListener("input", (e) => {
			let p = document.getElementsByTagName("p")[0];
			let text = textarea.value
			let num_lines = text.split('\n').length

			let line_text = p.innerHTML;
			let line_nums = line_text.split("<br>");
			if (line_nums.length != num_lines) {
				p.innerHTML = "1";
				for (let i = 2; i <= num_lines; i++){
					p.innerHTML = p.innerHTML + "<br>" + i;
				}
			}
		})
	}
}

customElements.define('m-main-editor', MainEditor);
