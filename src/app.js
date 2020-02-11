// elements
const app = document.getElementById("app");
const headerSection = document.getElementById("header");


// classes
class AssetsImport{

	async assetImport(path){
		const response = await fetch(path);
		let text = await response.text();
		return text;
	}

	async loadCurves(){
		const blueSections = [...document.getElementsByClassName("section-blue")];
		const mainCurve    = await this.assetImport("./assets/svg/main-curve.svg");
		const topCurve     = await this.assetImport("./assets/svg/top-curve.svg");
		const bottomCurve  = await this.assetImport("./assets/svg/bottom-curve.svg");

		blueSections.forEach(section =>{
			section.innerHTML += section.className.includes("features") ? mainCurve: topCurve;
			section.innerHTML += bottomCurve;
		});

		return true
	}

	async loadLogo(){

	}

	async assetsLoad(){
		this.loadCurves();
		const logo = await this.assetImport("./assets/svg/logo.svg");
		const headerLogo = headerSection.getElementsByClassName("header__logo")[0];
		let html = headerLogo.innerHTML;
		headerLogo.innerHTML = logo + html;
	}
}



// functions




(function events(){ 

	document.addEventListener('DOMContentLoaded', () =>{
		new AssetsImport().assetsLoad();
	});

})();
