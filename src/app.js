// elements
const app = document.getElementById("app");
const langSelect = document.getElementById("langSelect");
const headerSection = document.getElementById("header");


// classes

class LangControl{

	CurrentLang = navigator.language.includes("es") ? "es" : "en";

	changeSectionLang(texts, section){
		let elements = section.querySelectorAll("*[lang]");
		if(texts.length === elements.length){
			texts.forEach((text,i) =>{
				elements[i].innerText = text;
			});

		}else{
			console.error("Elements overridas in lang change");
		}
	}

	async loadLang(lang){
		this.CurrentLang = lang;
    let importedLang = JSON.parse(await importResource("./language.json"))[lang];
		this.changeSectionLang(importedLang["headerSection"], headerSection);
	}

  async	startControl(){

		this.loadLang(this.CurrentLang);

    langSelect.addEventListener("click", () =>{
      let selectedLang  = langSelect.options[langSelect.selectedIndex].value;
			this.CurrentLang != selectedLang ? this.loadLang(selectedLang) : null ;
	  })
	}

}

class AssetsImport{

	async loadLogos(){
		const logo = await importResource("./assets/svg/logo.svg");
		const headerLogo = headerSection.getElementsByClassName("header__logo")[0];
		let html = headerLogo.innerHTML;
		headerLogo.innerHTML = logo + html;
		return true;
	}

	async loadCurves(){
		const blueSections = [...document.getElementsByClassName("section-blue")];
		const mainCurve    = await importResource("./assets/svg/main-curve.svg");
		const topCurve     = await importResource("./assets/svg/top-curve.svg");
		const bottomCurve  = await importResource("./assets/svg/bottom-curve.svg");

		blueSections.forEach(section =>{
			section.innerHTML += section.className.includes("features") ? mainCurve: topCurve;
			section.innerHTML += bottomCurve;
		});

		return true;
	}

	async assetsLoad(){
		this.loadCurves();
		this.loadLogos();
	}
}


// functions
async function importResource(path){
		const response = await fetch(path);
		let text = await response.text();
		return text;
}

(function events(){ 

	document.addEventListener('DOMContentLoaded', () =>{
		new AssetsImport().assetsLoad();
		new LangControl().startControl();
	});
	
	
})();
