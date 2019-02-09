import Vue from 'vue'

import {
	Button,
	Carousel,
	Drawer,
	Grid,
	Slider
} from 'muse-ui'


const componts = [Button,Carousel, Drawer,Grid,Slider]

export default{
	install(Vue){
		componts.forEach(c=>Vue.use(c))
	}
}