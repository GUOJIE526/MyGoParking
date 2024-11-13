<script setup>
import BreadcrumbsComponent from "@/components/BreadcrumbsComponent.vue";
import router from "@/router";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";

import { useRoute } from "vue-router";


const API_URL = `${import.meta.env.VITE_API_BASEURL}/Customers/login`;
const API_FURL = `${import.meta.env.VITE_API_BASEURL}/Customers/forgot`;
// const API_GURL = `${import.meta.env.VITE_API_BASEURL}/Customers/googleLogin`;
// const API_VURL = `${import.meta.env.VITE_API_BASEURL}/Customers/verify`;

const Line_Bind_URL = `${import.meta.env.VITE_API_BASEURL}`;
const route = useRoute(); //要從uri取得lineid

const userStore = useUserStore();


// Google 登入
// 狀態定義
// const router = useRouter();
// const loading = ref(false);
// const err = ref(null);
// const User = ref(null);
// const licensePlate = ref('');
// const showLicensePlateDialog = ref(false);
// const showMergeDialog = ref(false);
// const pendingGoogleToken = ref(null);

// // Google 登入回調
// const handleCredentialResponse = async (response) => {
//   loading.value = true;
//   error.value = null;
  
//   try {
//     const result = await loginWithGoogle(response.credential);
    
//     if (result.existingAccount) {
//       // 存在帳號，顯示合併確認
//       pendingGoogleToken.value = response.credential;
//       showMergeDialog.value = true;
//     } else {
//       // 新用戶，要求輸入車牌
//       pendingGoogleToken.value = response.credential;
//       showLicensePlateDialog.value = true;
//     }
//   } catch (err) {
//     error.value = err.message || '登入失敗';
//     console.error('Google 登入錯誤:', err);
//   } finally {
//     loading.value = false;
//   }
// };

// // 發送 Google Token 到後端
// const loginWithGoogle = async (token) => {
//   const response = await fetch( API_GURL , {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token }),
//   });

//   if (!response.ok) {
//     throw new Error(await response.text());
//   }

//   return await response.json();
// };

// // 提交車牌號碼
// const submitLicensePlate = async () => {
//   if (!licensePlate.value) {
//     error.value = '請輸入車牌號碼';
//     return;
//   }

//   loading.value = true;
//   try {
//     const response = await fetch('/api/auth/complete-registration', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token: pendingGoogleToken.value,
//         licensePlate: licensePlate.value,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('註冊失敗');
//     }

//     const data = await response.json();
//     userStore.setUser(data.user);
//     user.value = data.user;
//     showLicensePlateDialog.value = false;
//     router.push('/dashboard');
//   } catch (err) {
//     err.value = err.message;
//   } finally {
//     loading.value = false;
//   }
// };

// // 確認合併帳號
// const confirmMerge = async () => {
//   loading.value = true;
//   try {
//     const response = await fetch( API_VURL , {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         token: pendingGoogleToken.value,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('帳號合併失敗');
//     }

//     const data = await response.json();
//     userStore.setUser(data.user);
//     User.value = data.user;
//     showMergeDialog.value = false;
//     router.push('/dashboard');
//   } catch (err) {
//     error.value = err.message;
//   } finally {
//     loading.value = false;
//   }
// };

// // 登出
// const handleLogout = async () => {
//   try {
//     await userStore.logout();
//     User.value = null;
//     router.push('/login');
//   } catch (err) {
//     error.value = '登出失敗';
//   }
// };

// // 初始化 Google 登入
// onMounted(() => {
//   window.google.accounts.id.initialize({
//     client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // 從環境變數獲取
//     callback: handleCredentialResponse,
//     auto_select: false,
//     cancel_on_tap_outside: true
//   });

//   window.google.accounts.id.renderButton(
//     document.getElementById('g_id_signin'),
//     { 
//       theme: 'outline', 
//       size: 'large',
//       width: 250,
//       logo_alignment: 'center'
//     }
//   );

//   // 檢查是否已經登入
//   const token = localStorage.getItem('auth_token');
//   if (token) {
//     checkAuthStatus();
//   }
// });

// // 檢查認證狀態
// const checkAuthStatus = async () => {
//   try {
//     const response = await fetch('/api/auth/verify', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
//       }
//     });
    
//     if (response.ok) {
//       const userData = await response.json();
//       user.value = userData;
//       userStore.setUser(userData);
//     } else {
//       handleLogout();
//     }
//   } catch (err) {
//     handleLogout();
//   }
// };

// Google 登入 end

// onMounted(async () => {
//   window.google.accounts.id.initialize({
//     // 初始化 Google 登入
//   client_id: '1082013721099-pvgt90o9snnqur6kir30q4ccjqr1889e.apps.googleusercontent.com',
//   callback: handleCredentialResponse
//   });
//   window.google.accounts.id.renderButton(
//           document.getElementById('g_id_signin'),
//           { theme: 'outline', size: 'large' }
//         );
// });

// const googleLogin = async () =>
// {
//   const response = await fetch(API_GURL, {
//     method: "POST",
//     body: JSON.stringify(user),
//     headers: { "Content-Type": "application/json" },
//   });
// }


// const handleCredentialResponse = (response) => {//google API提供的response
//       console.log('Google ID Token:', response.credential);
//       // 將 Token 傳送到後端
//     sendTokenToBackend(response.credential);
//     };

// const sendTokenToBackend = async (idToken) => {
//   try {
//         const response = await fetch(API_VURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 token: idToken,   // 把 Google Token 發送到後端
//             }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log('登入成功:', data);
//             // 根據後端的回應處理登入後邏輯
//         } else {
//             console.error('登入失敗:', data.message);
//         }
//     } catch (error) {
//         console.error('請求失敗:', error);
//     }
// };


const user = {
  email: "",
  password: "",
};

const send = async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const datas = await response.json(); // 取得會員資訊
    if (datas.message === "登入成功") {
      // 成功登入時，儲存資料並更新 Pinia 狀態
      userStore.updateUser(datas);
      userStore.login(); // 更新登入狀態
      Swal.fire({
        title: "登入成功!!",
        text: "",
        icon: "success"
      });
      //-------處理line綁定的部分(如果有讀取到line user ID)
      // 嘗試從 sessionStorage 取得 line_user_id
      const lineUserId = sessionStorage.getItem("line_user_id");

      // 若存在 line_user_id，進行綁定處理
      if (lineUserId) {
        const userId = userStore.userId;
        const userIdString = userId.toString();
        await bindLineUser(lineUserId, userIdString);
      }

      router.push("/search");
    } else if (datas.message === "無此帳號") {
      Swal.fire({
        title: "無此帳號,請重新登入!!",
        icon: "question"
      });
    } else {
      Swal.fire({
        title: "登入失敗!!",
        icon: "question"
      }); 
    }
  }
};

//忘記密碼

const message = ref("");
const error = ref("");
const isForgot = ref(false);

const forgot = () => {
  isForgot.value = true;
};

const sendResetLink = async () => {
  message.value = "";
  error.value = "";

  try {
    const response = await fetch(API_FURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });

    if (!response.ok) {
      throw new Error("發送失敗，請稍後再試。");
    }

    const result = await response.json();
    message.value = result.message || "重設密碼的連結已發送至您的 Email";
  } catch (err) {
    error.value = err.message || "發送過程中出錯";
  }
};

// 綁定Line
const bindLineUser = async (lineUserId, userId) => {
  try {
    const response = await fetch(`${Line_Bind_URL}/LineBinding/bind`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ line_user_id: lineUserId, user_id: userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("錯誤回應: ", errorData);
      alert(`綁定失敗: ${errorData.message || "未知錯誤"}`);
      return;
    }

    const data = await response.json();
    if (data.success) {
      alert("綁定成功");
      window.close(); //關閉此視窗
    } else {
      alert("綁定失敗");
    }
  } catch (err) {
    console.error("錯誤", err);
    alert("發生錯誤，請稍後再試");
  }
};

//by 33
onMounted(() => {
  const lineUserId = route.query.line_user_id;
  if (lineUserId) {
    //若 URL中有line_user_id，將其存入 sessionStorage
    sessionStorage.setItem("line_user_id", lineUserId);
  }
});
</script>

<!-- 載入程式庫 -->

<template>
  <main id="main">
    <!-- 麵包屑 -->
    <BreadcrumbsComponent>
      <template #title>
        <h2>Sign In</h2>
      </template>
      <template #page> 登入 </template>
    </BreadcrumbsComponent>

    <!-- ======= Get Started Section ======= -->
    <section id="get-started" class="get-started section-bg">
      <div class="container">
        <div class="row justify-content-between gy-4">
          <div class="col-lg-6 d-flex align-items-center" data-aos="fade-up">
            <div class="content">
              <h3>歡迎回到我們的停車場平台</h3>
              <p>
                透過登入帳戶，您可以快速存取個人停車資訊，管理車位預訂，並享受專屬會員優惠。只需輸入您的電子郵件和密碼，即可隨時隨地輕鬆掌握您的停車動態。
              </p>

              <p>
                登入後，您將能夠：<br />
                查看與管理預訂：隨時查看您已預訂的車位，或進行修改與取消。<br />
                -即時通知：接收車位可用性提醒，確保您不會錯過任何機會。<br />
                -更新個人資料：輕鬆管理車輛資訊與聯絡方式，確保停車場快速識別您的車輛。<br />
                -專屬會員優惠：登入後可查看最新的停車優惠與促銷活動，節省更多停車費用。<br /><br />
                如果您還沒有帳戶，歡迎先前往註冊頁面創建帳戶，開始享受便捷的停車服務！
              </p>
            </div>
          </div>

          <div class="col-lg-5" data-aos="fade">
            <form
              @submit.prevent="send"
              action="forms/quote.php"
              method="post"
              class="php-email-form"
            >
              <h3 v-if="!isForgot">登入</h3>
              <h3 v-if="isForgot">忘記密碼</h3>
              <p v-if="!isForgot">請輸入信箱及密碼</p>
              <p v-if="isForgot">請輸入信箱</p>
              <div class="row gy-3">
                <div class="col-md-12">
                  <input
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="請輸入Email帳號"
                    required
                    v-model="user.email"
                    id="email"
                  />
                </div>
                <div class="col-md-12">
                  <input
                    v-if="!isForgot"
                    type="password"
                    class="form-control"
                    name="psw"
                    placeholder="請輸入密碼"
                    v-model="user.password"
                    id="password"
                  />
                </div>

                <div class="col-md-12 text-center">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">您已成功登入!</div>

                  <button v-if="!isForgot" type="submit">登入</button>
                  <button
                    v-if="isForgot"
                    class="button-17"
                    @click="sendResetLink"
                  >
                    送出
                  </button>
                </div>
                <!-- <hr>
                <div id="g_id_signin"></div> -->
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-5 mb-4 border-secondary-subtle" />
                  <div
                    class="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center"
                  >
                    <RouterLink
                      :to="{ name: 'signUp' }"
                      class="link-secondary text-decoration-none"
                      >註冊新帳號
                    </RouterLink>
                    <button
                      class="btn-none"
                      :disabled="isLoading"
                      @click="forgot"
                    >
                      忘記密碼
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p v-if="message">{{ message }}</p>
            <p v-if="error">{{ error }}</p>
          </div>
          <!-- End Quote Form -->
        </div>
      </div>
    </section>
    <!-- End Get Started Section -->
  </main>
</template>

<style lang="css" scoped>
/*#g_id_signin{
  text-align: center; 
  margin-left: 50px; 
  display: inline-block;
} */
.btn-none {
  border: 0;
  background-color: #fff;
  color: #4f4f4f;
}

.button-17 {
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
}

.button-17:hover {
  background: #f1f1f1;
  color: #4f4f4f;
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
    0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17:focus {
  outline: none;
}

.button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
    rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
    rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}
</style>
