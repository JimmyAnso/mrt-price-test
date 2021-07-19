<template>
  <!-- 搜尋結果 -->
  <div class="result">
    <div class="result__header">
      <img src="../../public/image/Rectangle17.png" alt="" class="landmark" />
      <div class="result__header--input">
        <div class="from inputList">
          <p>從{{ title }}</p>
          <h3>{{ $route.query.start }}</h3>
        </div>
        <div class="to inputList">
          <p>至</p>
          <h3>{{ $route.query.end }}</h3>
        </div>
      </div>
    </div>

    <div class="result__point"></div>

    <div class="result__output">
      <div class="general output">
        <div class="title">普通</div>
        <div class="price">{{ $route.query.adult }} <span>元</span></div>
      </div>
      <div class="seniorDisabled output">
        <div class="title">敬老/愛心</div>
        <div class="price">{{ $route.query.disabled }} <span>元</span></div>
      </div>
    </div>

    <div class="result__button">
      <button class="result__button--research" @click="goBack">重新查詢</button>
      <button class="result__button--copy" @click="copyUrlToClipboard">
        複製連結
      </button>
    </div>

    <router-link class="result__about" to="/about">關於此程式</router-link>

    <!-- <div>
      <br><br>
      test test -->
    <!-- {{$route.query.test}} -->
    <!-- <input
        type="button"
        name="button"
        value="複製本頁網址"
        @click="softwhy"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    copyUrlToClipboard() {
      navigator.clipboard.writeText(window.location.href);
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push({ path: "/home" });
    },
    softwhy() {
      console.log("window.location.href:", window.location.href);

      console.log("window.location.pathName:", window.location.pathName);

      console.log("window.location.origin:", window.location.origin);

      console.log("this.$route.path:", this.$route.path);

      console.log("this.$route.fullPath:", this.$route.fullPath);

      console.log("this.$route.query:", this.$route.query.path);

      navigator.clipboard.writeText(window.location.href);
    },
  },
};
</script>

<style lang="scss" scoped>
$tealblue: #007ab0;
$charcoal: #434a42;
%container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
}
%button {
  font-size: 18px;
  border-radius: 100px;
  padding: 15px 40px;
  border: none;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #0097d9;
  }
}
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .landmark {
      width: 25px;
      height: 25px;
      margin:0 1vw;
    }
    &--input {
      .inputList {
        display: flex;
        margin-top: 10px;
        align-items: center;
        p {
          font-size: 14px;
          margin:0 5vw;
        }
        h3 {
          font-size: 18px;
          background-color: #eee;
          border-radius: 5px;
          height: 30px;
          width: 250px;
          font-weight: 500;
        }
      }
    }
  }
  &__point {
    margin-bottom: 45px;
    height: 6px;
    width: 6px;
    background-color: lightgray;
    border-radius: 50%;
    box-shadow: 20px 0 0 lightgray, -20px 0 0 lightgray;
    margin: 35px;
  }
  &__output {
    display: flex;
    box-shadow: 0 0 10px 10px #eee;
    margin-bottom: 40px;
    border-radius: 5px;
    .general {
      .title {
        border-right: 2px solid white;
        border-radius: 5px 0 0 0;
      }
      .price {
        border-right: 2px solid lightgray;
        border-radius: 0 0 0 5px;
      }
    }
    .seniorDisabled {
      .title {
        border-radius: 0 5px 0 0;
      }
      .price {
        border-radius: 0 0 5px 0;
      }
    }
    .output {
      .title {
        background-color: $charcoal;
        color: white;
        padding: 15px 20px;
        width: 80px;
        height: 25px;
        text-align: center;
      }
      .price {
        text-align: center;
        padding: 25px;
        font-size: 40px;
        span {
          font-size: 18px;
        }
      }
    }
  }
  &__button {
    @extend %container;
    justify-content: space-around;
    margin-bottom: 60px;
    &--research {
      @extend %button;
    }
    &--copy {
      @extend %button;
      background-color: $tealblue;
      color: white;
    }
  }
  &__about {
    color: $tealblue;
    font-size: 18px;
    text-decoration: none;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 2px solid $tealblue;
    }
  }
}
</style>