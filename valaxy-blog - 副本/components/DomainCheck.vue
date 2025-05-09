<template>
    <!-- 这个组件不需要模板内容，因为它主要是通过脚本逻辑来操作DOM -->
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue'
  
onMounted(() => {
  const validDomain = ''; // 官方域名
  const redirectUrl = 'https://'; // 重定向链接
  const hostname = document.location.hostname;

  function createWatermark(text) {
    const watermarkDiv = document.createElement('div');
    watermarkDiv.style.pointerEvents = 'none';
    watermarkDiv.style.position = 'fixed';
    watermarkDiv.style.top = '0';
    watermarkDiv.style.left = '0';
    watermarkDiv.style.width = '100%';
    watermarkDiv.style.height = '100%';
    watermarkDiv.style.zIndex = '9999';
    watermarkDiv.style.opacity = '0.1';
    watermarkDiv.style.background = 'transparent';
    watermarkDiv.style.overflow = 'hidden';
    watermarkDiv.style.display = 'flex';
    watermarkDiv.style.justifyContent = 'center';
    watermarkDiv.style.alignItems = 'center';
    watermarkDiv.style.flexWrap = 'wrap';

    const watermarkText = document.createElement('div');
    watermarkText.innerText = text;
    watermarkText.style.color = 'black';
    watermarkText.style.fontSize = '30px';
    watermarkText.style.transform = 'rotate(-30deg)';
    watermarkText.style.whiteSpace = 'nowrap';
    watermarkText.style.margin = '20px';

    for (let i = 0; i < 100; i++) {
      watermarkDiv.appendChild(watermarkText.cloneNode(true));
    }

    document.body.appendChild(watermarkDiv);
  }

  // 如果是 localhost，直接进入，并在控制台提示用户
  if (hostname === 'localhost') {
    console.log('Completely: 当前处于本地开发环境 (localhost)');
    return;
  }
  // 如果访问的是 domain.com ，直接跳转到 www.domain.com
  else if (hostname === 'domain.com') {  //这里需要更改为你自己的域名
    console.log('Completely: 已经跳转到官方域名 (www.domain.co)');  //这里需要改为你的官方域名
    window.location.replace(redirectUrl);
  }
  // 如果访问的是其他域名，提示用户并添加水印
  else if (hostname !== validDomain) {
    createWatermark(validDomain); // 给页面加上前边设置的域名为水印
    const userResponse = confirm("提示：您当前浏览的页面不是正版(或者站点已经迁移域名)，建议您跳转至官方(www.domain.com)进行浏览！如果不是博主的域名及时留言反馈，博主域名为：www.domain.com");
    if (userResponse) {
      window.location.replace(redirectUrl);
    }
  }
});
  </script>