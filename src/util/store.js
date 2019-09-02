const store = {
	setItem:(key, val) => {
    localStorage.setItem(key,val)
	},
	getItem:(key) => {
     localStorage.getItem(key)
	},
	removeItem:(key)=>{
		localStorage.removeItem(key)
	},
	clearAll:()=>{
		localStorage.clear()
	}
};
export default store;
