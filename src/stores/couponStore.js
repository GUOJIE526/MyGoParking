import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import Swal from "sweetalert2";

export const useCouponStore = defineStore("couponStore", {
  state: () => ({
    coupons: [], // 儲存領取到的優惠券
  }),
  actions: {
    async addCoupon() {
      const userStore = useUserStore();
      const g = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      const NewGuid = function () {
        return (
          g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g()
        );
      };
      let couponNumber = NewGuid();
      try {
        const BASE_URL = import.meta.env.VITE_API_BASEURL;
        const ADD_URL = `${BASE_URL}/Customers/coupon`;
        const couponData = {
          couponId: 0,
          couponCode: `#${couponNumber}`,
          discountAmount: 50,
          validFrom: "2024-01-01T00:00:00",
          validUntil: "2024-12-01T00:00:00",
          isUsed: false,
          userId: userStore.userId,
        };

        const response = await fetch(ADD_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(couponData),
        });
        const result = await response.json();
        if (response.ok) {
          if (result.success === true) {
            Swal.fire({
              title: result.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            // userStore.isCouponClaimed = true;
          } else if (
            result.success === false &&
            result.message === "領取失敗,您尚未註冊或登入"
          ) {
            Swal.fire({
              title: result.message,
              icon: "info",
            });
          } else if (
            result.success === false &&
            result.message === "領取失敗, 請洽客服人員"
          ) {
            Swal.fire({
              title: result.message,
              icon: "info",
            });
          }
        }
      } catch (error) {
        Swal.fire({
          title: error.message,
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.error(error.message);
      }
    },
  },
});
