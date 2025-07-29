import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://xiablog.asia',  //你网站的URL
  favicon: "https://valaxy.site/favicon.svg",	// 网页图标链接
  lang: 'zh-CN',  //默认语言
  title: "X.博客",  //网站标题
  subtitle: ' ',//网站副标题
  author: {
    name: 'X.Rui',//博主名称
    avatar: "https://cdn.z.wiki/autoupload/20250509/1BTk/623X712/20250426-1655-Q%E7%89%88%E5%BE%AE%E7%AC%91%E5%A5%B3%E4%B8%BB-remix-01jsrmwj3benx9z2kztnwpfvra123.png",	//头像链接
    status: {
      emoji: '💛'	// 头像旁边的emoji
    },
  },
  
  description: '',  //简介
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',  //这个是博客自带的RSS订阅，尽量留着，方便其他博友为你订阅
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/XIARUI100415',  //这里填写你的GitHub地址，不需要的话删除此字段即可
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/2069125798',  //这里填写你的BiliBili地址，不需要的话删除此字段即可
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: 'E-Mail',
      link: 'mailto:xr1948083823@outlook.com', //这里在mailto后面填写你的Email地址，不需要的话删除此字段即可
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
  ],

  search: {
    enable: true,
  },
    comment: {
      enable: true
    },
    statistics: {
      enable: true,
      readTime: {
        /**
         * 阅读速度
         */
        speed: {
          cn: 300,
          en: 200,
        },
      },
    },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.z.wiki/autoupload/20250510/wj8E/1080X1679/1746810238349.jpg', //这里填写你的支付宝收款码图片链接
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.z.wiki/autoupload/20250510/fs7J/1153X1570/mm-facetoface-collect-qrcode-1746810148671.png',//这里填写你的微信收款码图片链接
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})