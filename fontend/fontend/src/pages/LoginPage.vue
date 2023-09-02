<template>
  <div class="loginPage">
    <img src="../assets/phone.png" alt="" class="phoneImage" />
    <div class="loginForm">
      <img src="../assets/logo.svg" alt="" />
      <form @submit.prevent>
        <input
          type="email"
          placeholder="邮箱"
          v-model="email"
          required
          ref="emailInput"
        />
        <input
          v-if="!isLogin"
          type="text"
          placeholder="用户名"
          v-model="username"
          required
          ref="usernameInput"
        />
        <input
          type="password"
          placeholder="密码"
          v-model="password"
          required
          ref="passwordInput"
          minlength="6"
        />
        <!-- 根据 isLogin 的值来决定按钮的文本内容和点击时要执行的函数是登录还是注册 -->
        <button
          type="submit"
          class="loginButton"
          @click="isLogin ? login() : register()"
        >
          {{ isLogin ? "登录" : "注册" }}
        </button>
        <p @click="isLogin = !isLogin" class="info">
          {{ isLogin ? "还没有账号？点击注册" : "已有账号？点击登录" }}
        </p>
        <div v-if="!isLogin" class="agreement">
          <input
            type="checkbox"
            v-model="agreementChecked"
          />勾选表示同意隐私协议和使用规范
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const isLogin = ref(true);

//同意协议默认为false
const agreementChecked = ref(false);
const email = ref("");
const emailInput = ref(null);
const password = ref("");
const passwordInput = ref(null);
const username = ref("");
const usernameInput = ref(null);

const store = useStore();
const router = useRouter();

function defineFields() {
  const fields = {
    email: {
      value: email,
      input: emailInput,
    },
    password: {
      value: password,
      input: passwordInput,
    },
  };
  if (!isLogin.value) {
    fields.username = {
      value: username,
      input: usernameInput,
    };
  }
  return fields;
}

function checkFormValidity() {
  const fields = defineFields();
  let isValid = true;
  for (const field of Object.values(fields)) {
    if (!field.input.value.checkValidity()) {
      field.input.value.reportValidity();
      isValid = false;
    }
  }
  return isValid;
}
async function register() {
  if (!agreementChecked.value) {
    alert("请先阅读并同意隐私协议和使用规范");
    return;
  }
  if (checkFormValidity()) {
    await store
      .dispatch("registerUser", {
        email: email.value,
        username: username.value,
        password: password.value,
      })
      .then(() => {
        if (store.getters.getUserConfirmed) {
          alert("注册成功！")
          isLogin.value = true
        } else {
          alert("注册失败，请检查输入是否正确");
          return;
        }
      })
      .catch((err) => {
        alert("注册失败，请稍后再试");
        throw err;
      });
  }

  
}

async function login() {
  if (checkFormValidity()) {
    await store
      .dispatch("loginUser", {
        email: email.value,
        password: password.value,
      })
      .then(() => {
        if (store.getters.getUserConfirmed) {
          router.replace("/");
        } else {
          alert("登录失败，请检查邮箱和密码是否正确");
          return;
        }
      })
      .catch((err) => {
        alert("登录失败，请稍后再试");
        throw err;
      });
  }
}
</script>

<style lang="less" scoped>
.loginPage {
  //note:grid布局
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 5vw;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  background: #f8f9fb;
  padding: 0 10vw;
  .phoneImage {
    max-width: 400px;
    position: relative;
    top: 36px;
    justify-self: end;
  }
  .loginForm {
    justify-self: start;
    box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
    border-radius: 32px;
    background: white;
    padding: 74px 60px;

    display: grid;
    place-items: center;
    row-gap: 52px;
    width: 380px;
    > form {
      display: grid;
      row-gap: 24px;
      width: 100%;
      height: 100%;
      input {
        background: #fafafa;
        border-radius: 4px;
        border: none;
        &::placeholder {
          color: #9e9e9e;
        }
      }
      .loginButton {
        background: linear-gradient(89.93deg, #00c2ff 0.06%, #0047ff 105.68%);
        padding: 12px 0;
        color: white;
        border: none;
      }
      .info {
        color: #1da0ff;
        text-align: center;
        cursor: pointer;
      }
      .agreement {
        color: #a1a1a1;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }
}
</style>
