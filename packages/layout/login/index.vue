<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { NImage, NInput } from 'naive-ui';
  import { bgs } from '@packages/static';
  import { Random } from 'mockjs';
  import { useDateFormat, useNow } from '@vueuse/core';
  const bg = ref(`url(${bgs[Random.integer(0, bgs.length - 1)]})`);

  const [date, time] = [
    useDateFormat(useNow(), `MM月DD日,星期dd`),
    useDateFormat(useNow(), 'HH:mm:ss'),
  ];

  const router = useRouter();

  const login = function (e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      localStorage.setItem(
        'WIN_MINI_0.0.1_app_store',
        JSON.stringify({ accessToken: '66666' })
      );
      router.push('/desktop');
    }
  };
</script>

<template>
  <div class="login">
    <div class="login-content">
      <div class="time">{{ time }}</div>
      <div class="date">{{ date }}</div>
      <n-image
        width="100"
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
      <div class="userName">Admin</div>
      <n-input
        type="password"
        placeholder="密码"
        value="123456"
        @keydown="login"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
  .login {
    width: 100vw;
    height: 100vh;
    background: v-bind(bg) no-repeat center / cover;
    position: relative;
    .login-content {
      backdrop-filter: blur(8px);
      position: absolute;
      inset: 0;
      text-align: center;
      padding: 100px 42%;
      color: white;
      div.n-input,
      div.n-image {
        display: inline-block;
        text-align: left;
      }
      .time {
        font-weight: bold;
        font-size: 36px;
      }
      .date {
        margin: 3px 0 150px 0;
      }
      .userName {
        margin: 10px 0;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
</style>
