// elements
const app = document.getElementById("app");


// classes
class AssetsImport{

	static async assetImport(path){
		const response = await fetch(path);
		let text = await response.text();
		return text;
	}

	static async assetsLoad(){
		const blueSections = [...document.getElementsByClassName("section-blue")];
		const mainCurve = await this.assetImport("./assets/svg/main-curve.svg");
		const topCurve= await this.assetImport("./assets/svg/top-curve.svg");
		const bottomCurve= await this.assetImport("./assets/svg/bottom-curve.svg");

		blueSections.forEach(section =>{
			section.innerHTML += section.className.includes("features") ? mainCurve : topCurve;
			section.innerHTML += bottomCurve;
		});
	}
}



// functions




(function events(){ 

	document.addEventListener('DOMContentLoaded', () =>{
		AssetsImport.assetsLoad();
	});

})();
