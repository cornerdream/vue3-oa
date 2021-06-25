
<template>
<div>
 <img ref="img" /> 
</div>
 
</template>
<script>
export default {
  name: "authImg",
  props: {
    authSrc: {
      type: String,
      required: false,
      default: "",
    }
  },
  mounted () {
    let token = localStorage.getItem('token')
    Object.defineProperty(Image.prototype, 'authsrc', {
      writable: true,
      enumerable: true,
      configurable: true
    })
    let img = this.$refs.img
    let request = new XMLHttpRequest();
    request.responseType = 'blob';
    request.open('get', this.authSrc, true);
    request.setRequestHeader('Authorization', 'JWT '+token);
    request.onreadystatechange = e => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
          // const baseURL = 'http://192.168.1.212:8000';
        img.src = URL.createObjectURL(request.response);
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        }
      }
    };
    request.send(null);
  }
}
</script>