<template>
	<div>
		<input type="text" value="" v-model="name" placeholder="请输入用户名">
		<input type="text" value="" v-model="age" placeholder="请输入年龄">
		<input type="file" @change="getFile($event)">
		<button @click="submitForm($event)">提交</button>
	</div> 
</template>

	<script>
		import axios from 'axios'
		
		export default{
			data(){
				return {
				name: '',
				age: '',
				file: ''
				}
			},
			methods: {
				getFile(event) {
					this.file = event.target.files[0];
					console.log(this.file);
				},
				submitForm(event) {
					event.preventDefault();
					let formData = new FormData();
					formData.append('name', this.name);
					formData.append('age', this.age);
					formData.append('files', this.file);
					let params = {
						formData: formData
					};

					let config = {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}

					axios.post('http://192.168.241.41:8080/njzy/mobile/sys/file/d2220de938734a46b9c7699ae1c9997e/uploadFile', params.formData, config).then(function(res) {
						if(res.status === 2000) {
							/*这里做处理*/
						}
					})
				}
			}
		}
		
	</script>

	<style>

	</style>