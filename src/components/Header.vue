<template>
  <div class="header">
    <div class="header__menu">
      <!-- hamburger 3span -->
      <input type="checkbox" id="hamburger-control" v-model="hamStatus" />

      <label class="header__menu--hamburger" for="hamburger-control">
        <span class="top"></span>
        <span class="middle"></span>
        <span class="bottom"></span>
      </label>

      <!-- 導覽列 -->
      <nav class="header__menu--nav" :class="{navAvailable: hamStatus}">
        <router-link to="/home" @click="hamStatusFalse" class="router-link-active"
          >台北捷運票價<img src="../../public/image/dropdown-icon.png" alt=""
        /></router-link>
        <router-link to="/about" @click="hamStatusFalse"
          >關於此程式<img src="../../public/image/dropdown-icon.png" alt=""
        /></router-link>
        
      </nav>
    </div>
    <div class="header__github">
      <a
        href="https://github.com/JimmyAnso/mrt-price/tree/main"
        target="_blank"
      >
        <img src="../../public/image/Github.png" alt="" />
      </a>
    </div>
    <div class="positionAbsolute" :class="{header__mask:hamStatus}" @click="hamStatusFalse"></div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      hamStatus: false,
    };
  },
  computed: {
    // hamStatus(){
    //   // if
      
    // },
  },
  methods: {
    hamStatusFalse() {
      this.hamStatus=false;
      // document.getElementById("hamburger-control").checked = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap");
$tealblue: #007ab0;
$charcoal: #434a42;
%container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 45px;
}
%hamburger {
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #000;
  margin-bottom: 6px;
  transition: 0.3s;
}
.header {
  @extend %container;
  box-shadow: 0 5px 10px -10px black;
  &__menu {
    display: flex;
    margin-left: 25px;
    #hamburger-control {
      display: none;
    }
    // hamburger 3span
    &--hamburger {
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      width: 40px;
      height: 40px;
      &:hover {
        cursor: pointer;
      }
      .top {
        @extend %hamburger;
      }
      .middle {
        @extend %hamburger;
        width: 60%;
        transform: translate(-32%, 0%);
      }
      .bottom {
        @extend %hamburger;
        margin-bottom: 0px;
      }
    }

    &--nav {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      transition: 0.5s;
      .router-link-exact-active {
        color: $tealblue;
      }
      a {
        text-decoration: none;
        padding: 8px 25px;
        color: $charcoal;
        font-size: 18px;
        box-shadow: 0px 0 2px 0px lightgray;
        &:hover {
          color: #0097d9;
          border-bottom: 2px solid#0097d9;
        }
        img {
          display: none;
        }
      }
    }
  }
  &__github {
    margin-right: 18px;
    a {
      img {
        vertical-align: middle;
      }
    }
  }
  &__mask{
    display:none;
    top:130px;
    bottom:0;
    right:0;
    left:0;
    background-color:$charcoal;
    opacity: 0.41;
  }
  .positionAbsolute{
    position:absolute;
  }
}
@media screen and (max-width: 768px) {
  .header {
    justify-content: space-between;
    &__menu {
      &--hamburger {
        display: flex;
      }
      &--nav {
        width: 100%;
        display: none;
        position: absolute;
        top: 45px;
        left: 0%;
        a {
          img {
            display: block;
          }
        }
      }
      .navUnavailable {
        display:none;
      }
      .navAvailable{
        display:block;
      }
      #hamburger-control:checked {
        & ~ .header__menu--hamburger {
          .top {
            transform: translate(0%, 240%) rotate(45deg);
          }
          .middle {
            opacity: 0;
          }
          .bottom {
            transform: translate(0%, -240%) rotate(-45deg);
          }
        }
        & ~ .header__menu--nav {
          // display: block;
          top: 45px;
          a {
            display: flex;
            justify-content: space-between;
            img {
              object-fit: none;
            }
          }
        }
      }
    }
    &__mask{
      display:block;
    }
  }
}
@media screen and (max-width: 576px) {
  .header {
    padding: 0 0%;
  }
}
</style>