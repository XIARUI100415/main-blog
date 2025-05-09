<script lang="ts" setup>
import { useSiteConfig, useValaxyConfig, useValaxyDark } from 'valaxy'
import pkg from 'valaxy/package.json'
import { capitalize, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeConfig } from '../node_modules/valaxy-theme-yun/composables'
import DomainCheck from '../components/DomainCheck.vue'
import NoticeBar from '../components/NoticeBar.vue'
import { ref, onMounted, onUnmounted } from 'vue'

// 原有配置
const { isDark } = useValaxyDark()
const gradientStyles = computed(() => {
  return isDark.value 
    ? { '--gradient-from': '0 0 0', '--gradient-to': '0 0 0' }
    : { '--gradient-from': '161 196 253', '--gradient-to': '194 233 251' }
})

const { t } = useI18n()
const config = useValaxyConfig()
const siteConfig = useSiteConfig()
const themeConfig = useThemeConfig()
const year = new Date().getFullYear()

const isThisYear = computed(() => year === themeConfig.value.footer.since)

const poweredHtml = computed(() => 
  t('footer.powered', [`<a href="${pkg.repository.url}" target="_blank" rel="noopener">Valaxy</a> <span class="op-60">v${pkg.version}</span>`]
))

const footerIcon = computed(() => 
  themeConfig.value.footer.icon || {
    url: pkg.repository.url,
    name: 'i-ri-cloud-line',
    title: pkg.name,
  }
)

// 新增功能
const customLinks = ref([
  {
    name: '开往',
    link: 'https://www.travellings.cn/go-by-clouds.html',
    icon: 'https://www.travellings.cn/assets/logo.gif',
  },
])

const voyagerDistance = ref<string>('正在加载...')

const getVoyagerDistance = (): void => {
  const now = new Date()
  const start = new Date('01/17/2024 00:00:00')
  const timeDifferenceInSeconds = (now.getTime() - start.getTime()) / 1000
  const distanceInKilometers = Math.trunc(23400000000 + timeDifferenceInSeconds * 17)
  const astronomicalUnits = (distanceInKilometers / 149600000).toFixed(6)

  voyagerDistance.value = `旅行者 1 号当前距离地球 ${distanceInKilometers.toLocaleString()} 千米，约为 ${astronomicalUnits} 个天文单位 🚀`
}

let intervalId: NodeJS.Timeout | null = null

onMounted(() => {
  getVoyagerDistance()
  intervalId = setInterval(getVoyagerDistance, 1000)
})

onUnmounted(() => {
  intervalId && clearInterval(intervalId)
})
</script>

<template>
  <div class="footer-container">
    <DomainCheck class="domain-check" />
    <NoticeBar class="notice-bar" />

    <footer
      flex="~ col"
      class="yun-footer va-footer px-4 py-4 pt-0 text-$va-c-text-light w-full mt-14"
      bg="white dark:$va-c-bg-soft"
      text="center sm"
    >
      <YunCloud 
        v-if="themeConfig.footer.cloud?.enable" 
        class="absolute top--10 left-0 right-0"
      />

      <!-- 原有备案信息 -->
      <div 
        v-if="themeConfig.footer.beian?.enable && themeConfig.footer.beian.icp" 
        class="beian" m="y-2"
      >
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
          {{ themeConfig.footer.beian.icp }}
        </a>
      </div>

      <!-- 新增萌备案 -->
      <div class="beian" m="y-2">
        <a href="https://icp.gov.moe/?keyword=[萌号]" target="_blank" rel="noopener">萌ICP备号</a>
      </div>

      <!-- 版权信息 -->
      <div class="copyright flex justify-center items-center gap-2" p="1">
        <span>
          &copy;
          <template v-if="!isThisYear">
            {{ themeConfig.footer.since }} -
          </template>
          {{ year }}
        </span>

        <a
          v-if="themeConfig.footer.icon?.enable"
          class="inline-flex"
          :class="themeConfig.footer.icon.animated ? 'animate-pulse' : ''"
          :href="footerIcon.url"
          target="_blank"
          :title="footerIcon.title"
        >
          <div :class="footerIcon.name" />
        </a>
        <span>{{ siteConfig.author.name }}</span>
      </div>

      <!-- 自定义链接 -->
      <div class="custom-links flex justify-center items-center gap-2" p="1">
        <template v-for="(link, index) in customLinks" :key="index">
          <a :href="link.link" target="_blank" rel="noopener">
            <img v-if="link.icon" :src="link.icon" :alt="link.name" class="h-5">
            <span v-else>{{ link.name }}</span>
          </a>
          <span v-if="index < customLinks.length - 1"> |</span>
        </template>
      </div>

      <!-- 技术支持信息 -->
      <div v-if="themeConfig.footer.powered" class="powered" m="2">
        <span v-html="poweredHtml" />
        <span mx-1>|</span>
        <span>
          <span>{{ t('footer.theme') }}</span>
          <span mx-1>-</span>
          <a :href="themeConfig.pkg.repository.url" :title="themeConfig.pkg.name" target="_blank">
            {{ capitalize(config.theme) }}
          </a>
          <span class="ml-1 op-60">v{{ themeConfig.pkg.version }}</span>
        </span>
      </div>

      <!-- 旅行者一号信息 -->
      <div class="voyager-distance" m="y-2">
        {{ voyagerDistance }}
      </div>

      <div class="yun-footer-gradient" :style="gradientStyles" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  position: relative;
  z-index: 100;
}

.domain-check {
  margin: 1rem auto;
  max-width: 80%;
  text-align: center;
  font-size: 0.9em;
  color: var(--va-c-text-light);
  opacity: 0.8;
}

.notice-bar {
  position: relative;
  z-index: 1000;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  background: rgba(var(--va-c-primary), 0.1);
  border-radius: 8px;
  max-width: 600px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem;
    font-size: 0.85em;
    padding: 0.5rem 1rem;
  }
}

.yun-footer {
  letter-spacing: 0.05rem;
  line-height: 1.8;
  position: relative;
  z-index: 1;

  &-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px;
    z-index: 999;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgb(var(--gradient-from) / 0.2) 0,
      rgb(var(--gradient-to) / 0.2) 100%
    );
    mask-image: linear-gradient(#fff0, #000 70%);
    animation: fade-in 2s;
  }
}

// 新增样式
.custom-links {
  img {
    height: 20px;
    vertical-align: middle;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

.voyager-distance {
  font-size: 14px;
  color: var(--va-c-text-light);
  opacity: 0.8;
  line-height: 1.4;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>