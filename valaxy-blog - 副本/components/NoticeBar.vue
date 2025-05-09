<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const userIp = ref('');
const ipLocation = ref('');
const distance = ref(''); // 与站长的距离
const serverDistance = ref(''); // 与博客服务器的距离
const greeting = ref('');
const isLoading = ref(true);
const error = ref('');
const isVisible = ref(true); // 控制公告栏是否显示

const getCityCoordinates = async (ip: string) => {
  const apiKey = 'API_KEY'; // 替换为实际的 API 密钥，在https://wcode.net/get-apikey
  const response = await fetch(`https://wcode.net/api/ip/v3/info/free?ip=${ip}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });
  const data = await response.json();
  //ipLocation.value = `${data.data.region.iso_code} ${data.data.region.name} ${data.data.city.name}` || '未知地区';

  if (data.status === 'success' && data.data.extra_info.latitude && data.data.extra_info.longitude) {
    return { lat: parseFloat(data.data.extra_info.latitude), lng: parseFloat(data.data.extra_info.longitude) };
  } else {
    console.error('Failed to get city coordinates:', data);
    return { lat: 0, lng: 0 }; // 默认值
  }
};

onMounted(async () => {
  try {
    // 使用 ip.useragentinfo.com 获取 IP 详细信息
    const ipResponse = await fetch('https://ip.useragentinfo.com/json?ip=');  //这里使用的公共API不保证可用，请更换为可用的API
    const locationData = await ipResponse.json();

    // 解析返回的数据
    userIp.value = locationData.ip;
    ipLocation.value = `${locationData.short_name} ${locationData.country} ${locationData.province} ${locationData.city} ${locationData.area}` || '未知地区';  //这里请根据你的API灵活更改显示信息

    // 获取用户所在城市的经纬度
    const userLocation = await getCityCoordinates(locationData.ip);

    // 检查经纬度是否有效
    if (userLocation.lat === 0 && userLocation.lng === 0) {
      throw new Error('无法获取有效的经纬度信息');
    }

    // 计算与站长的距离（设站长位置为）  //请自行设置站长经纬度
    const stationLocation = { lat:103.839 , lng:36.5841  };
    distance.value = calculateDistance(stationLocation, userLocation).toFixed(2);

    // 博客服务器经纬度（设服务器位置为）  //请自行设置服务器经纬度
    const serverLocation = { lat:103.839 , lng:36.5841  };
    // 计算与博客服务器的距离
    serverDistance.value = calculateDistance(serverLocation, userLocation).toFixed(2);

    // 根据时间生成问候语
    const hour = new Date().getHours();
    greeting.value = hour < 12 ? '早上好，美好的一天又开始了😎' : hour < 18 ? '下午好，累了就好好休息一下吧🎶' : '晚上好，在属于自己的时间里好好放松吧😶‍🌫️';
  } catch (err) {
    error.value = '无法加载公告信息，请稍后重试。刷新后如果问题仍然存在，请通过ruixia723@gmail.com联系我'
    console.error('Error:', err);
  } finally {
    isLoading.value = false;
  }
});

function calculateDistance(loc1: { lat: number, lng: number }, loc2: { lat: number, lng: number }) {
  const R = 6371;
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 关闭公告栏
function closeNotice() {
  isVisible.value = false;
}
</script>

<template>
  <Transition name="slide">
    <div v-if="isVisible" class="notice-bar">
      <div class="notice-content">
        <button class="close-button" @click="closeNotice">×</button>
        <h3>公告</h3>
        <p v-if="isLoading">加载中...</p>
        <p v-else-if="error">{{ error }}</p>
        <template v-else>
          <p>欢迎来到X.Rui的博客！有任何问题请联系邮箱: <a :href="`mailto:ruixia723@gmail.com`">【替换为你的邮箱】</a></p>
          <p>🎉 欢迎信息 🎉</p>
          <p>  欢迎来自 <span class="city">{{ ipLocation }}</span> 的小伙伴，<span class="greeting">{{ greeting }}</span>！您现在距离站长约 <span class="distance">{{ distance }}</span> 公里，距离博客服务器约 <span class="distance">{{ serverDistance }}</span> 公里。当前的IP地址为： <span class="ip">{{ userIp }}</span>，祝您在我的博客里玩的开心！</p>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.notice-bar {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.75); /* 不透明度降低到 75% */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 300px;
}

.notice-content {
  position: relative;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #000;
}

.notice-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.notice-content p {
  margin: 5px 0;
  font-size: 14px;
}

/* 颜色样式 */
.city {
  color: #5bbad5;
}

.greeting {
  color: #FFC0CB;
}

.distance {
  color: #5bbad5;
}

.ip {
  color: #5bd576;
}

/* 滑入滑出动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>