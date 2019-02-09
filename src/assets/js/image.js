export function imgs(url){
		let imgurl = url.slice(7)
		imgurl = decodeURIComponent(imgurl)
		return imgurl
	}
