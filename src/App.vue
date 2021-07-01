<template>
  <div class="mrt">
    <Header />
    <router-view class="main"></router-view>
    <Footer />
  </div>
</template>

<script>
// import axios from "axios";
// import jsSHA from "jssha";
import Selector from "./components/Selector";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Selector,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap");

#app {
}
* {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans TC", sans-serif;
}
.mrt {
  .main {
    min-height: calc(100vh - 140px);
    padding: 0 35%;
  }
}
@media screen and (max-width: 1200px) {
  .mrt {
    .main {
      padding: 0 30%;
    }
  }
}
@media screen and (max-width: 992px) {
  .mrt {
    .main {
      padding: 0 25%;
    }
  }
}
@media screen and (max-width: 768px) {
  .mrt {
    .main {
      padding: 0 20%;
    }
  }
}
@media screen and (max-width: 576px) {
  .mrt {
    .main {
      padding: 0 5%;
    }
  }
}
</style>
