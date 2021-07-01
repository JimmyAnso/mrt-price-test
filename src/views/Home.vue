<template>
  <div class="home">
    <!-- Logo -->
    <div class="home__logo">
      <h2 class="home__title">台北捷運票價</h2>
      <span>X</span>
      <a href="https://www.metro.taipei/" target="_blank">
        <img src="../../public/image/metro_taipei_logo.png" alt=""
      /></a>
    </div>
    <div class="home__point"></div>
    <div class="home__select">
      <!-- props in , emit out -->
      <!-- 起點 -->
      <Selector
        :cls="start.cls"
        :title="start.title"
        v-model:lineVmodel="input.startLineID"
        @getStartStationDataHook="getStartStationData"
        :lineData="lineData"
        :stationData="startStationData"
        v-model:stationVmodel="input.startStationID"
        @StartstationChangeHook="startStationChange"
      ></Selector>
      <!-- 目的地 -->
      <Selector
        :cls="end.cls"
        :title="end.title"
        v-model:lineVmodel="input.endLineID"
        @getEndStationDataHook="getEndStationData"
        :lineData="lineData"
        :stationData="endStationData"
        v-model:stationVmodel="input.endStationID"
        @EndstationChangeHook="endStationChange"
      ></Selector>
    </div>

    <!-- 按鈕 -->
    <div class="home__button">
      <button class="home__button--reset" @click="resetAll">重選</button>
      <button
        class="home__button--submit"
        v-bind:class="{ searchActive: searchIsActive }"
        @click="getPrice"
      >
        查詢
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsSHA from "jssha";
import Selector from "../components/Selector";
export default {
  data() {
    return {
      searchIsActive: false,
      input: {
        startLineID: null,
        startStationID: null,
        endLineID: null,
        endStationID: null,
      },
      start: {
        cls: "start",
        title: "起點",
      },
      end: {
        cls: "end",
        title: "終點",
      },
      apiUrl: {
        getLineDataUrl:
          "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Line/TRTC?$top=30&$format=JSON",
        getStationDataUrl:
          "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationOfLine/TRTC?$top=30&$format=JSON",
      },
      lineData: {},
      startStationData: {},
      endStationData: {},
      priceData: {},
      priceAdult: null,
      priceSeniorDisabled: null,
      startLineName: null,
      startStationName: null,
      endLineName: null,
      endStationName: null,
    };
  },
  components: {
    Selector,
  },
  computed: {
    getPriceDataUrl() {
      return (
        "https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TRTC?$filter=OriginStationID%20eq%20'" +
        this.input.startStationID +
        "'%20and%20DestinationStationID%20eq%20'" +
        this.input.endStationID +
        "'&$format=JSON"
      );
    },
    searchIsActive() {
      if (
        this.input.startStationID != null &&
        this.input.endStationID != null
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.getLineData();
  },
  methods: {
    getAPI(currentUrl, currentFun) {
      const options = {
        method: "GET",
        headers: this.GetAuthorizationHeader(),
        url: currentUrl,
      };
      // axios(options);
      return axios(options)
        .then((response) => {
          // handle success
          console.log(response);
          currentFun(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          alert('請完成填選 "起點" 與 "目的地"');
        });
      return;
    },
    lineDataHandler(currentResponse) {
      this.lineData = currentResponse.data;
    },
    // 起點取得站Handler
    startStationDataHandler(currentResponse) {
      this.startStationData = currentResponse.data.find(
        (line) => line.LineID == this.input.startLineID
      );
    },
    // 目的地取得站Handler
    endStationDataHandler(currentResponse) {
      this.endStationData = currentResponse.data.find(
        (line) => line.LineID == this.input.endLineID
      );
    },
    // 取得票價Handler
    getPriceHandler(currentResponse) {
      this.priceData = currentResponse.data[0];
      // 取得全票與愛心票價
      this.priceAdult = this.priceData.Fares[0].Price;
      this.priceSeniorDisabled = this.priceData.Fares[1].Price;
      console.log(this.priceData);
    },
    // 取得線
    getLineData() {
      this.getAPI(this.apiUrl.getLineDataUrl, this.lineDataHandler);
    },
    // 起點取得站
    getStartStationData(lineVmodel) {
      this.input.startLineID = lineVmodel;

      this.startLineName = this.lineData.find(
        (line) => line.LineID == this.input.startLineID
      ).LineName.Zh_tw;

      // reset
      this.input.startStationID = null;

      this.getAPI(this.apiUrl.getStationDataUrl, this.startStationDataHandler);
    },
    // 目的地取得站
    getEndStationData(lineVmodel) {
      this.input.endLineID = lineVmodel;

      this.endLineName = this.lineData.find(
        (line) => line.LineID == this.input.endLineID
      ).LineName.Zh_tw;

      this.input.endStationID = null;
      this.getAPI(this.apiUrl.getStationDataUrl, this.endStationDataHandler);
    },
    startStationChange(stationVmodel) {
      this.input.startStationID = stationVmodel;

      this.startStationName = this.startStationData.Stations.find(
        (station) => station.StationID == this.input.startStationID
      ).StationName.Zh_tw;
    },
    endStationChange(stationVmodel) {
      this.input.endStationID = stationVmodel;

      this.endStationName = this.endStationData.Stations.find(
        (station) => station.StationID == this.input.endStationID
      ).StationName.Zh_tw;
    },
    // 取得票價Handler
    getPrice() {
      this.getAPI(this.getPriceDataUrl, this.getPriceHandler).then(() => {
        // this.goToResult() executed
        if (this.priceAdult && this.priceSeniorDisabled) {
          this.goToResult();
        }
      });
      console.log("起點：");
      console.log(this.input.startLineID);
      console.log(this.input.startStationID);

      console.log("目的地：");
      console.log(this.input.endLineID);
      console.log(this.input.endStationID);

    },
    goToResult() {
      this.$router.push({
        path: "/result",
        query: {
          start:
            this.input.startLineID +
            this.startLineName +
            "・" +
            this.startStationName,
          end:
            this.input.endLineID +
            this.endLineName +
            "・" +
            this.endStationName,
          adult: this.priceAdult,
          disabled: this.priceSeniorDisabled,
        },
      });
    },
    resetAll() {
      this.input.startLineID = null;
      this.input.startStationID = null;
      this.input.endLineID = null;
      this.input.endStationID = null;
    },
    GetAuthorizationHeader() {
      var AppID = process.env.VUE_APP_AppID;
      var AppKey = process.env.VUE_APP_AppKey;

      var GMTString = new Date().toGMTString();
      var ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      var HMAC = ShaObj.getHMAC("B64");
      var Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';

      return { Authorization: Authorization, "X-Date": GMTString };
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap");
$charcoal: #434a42;
$tealblue: #007ab0;
%container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;
}
%hamburger {
  display: block;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #000;
  margin-bottom: 4px;
  transition: 0.3s;
}
%button {
  font-size: 18px;
  border-radius: 100px;
  padding: 15px 60px;
  border: none;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #0097d9;
  }
}
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__logo {
    @extend %container;
  }
  &__title {
    font-family: "Noto Sans", sans-serif;
    font-family: "Noto Sans TC", sans-serif;
    font-family: "Noto Serif TC", serif;
  }
  &__point {
    margin-bottom: 45px;
    height: 6px;
    width: 6px;
    background-color: lightgray;
    border-radius: 50%;
    box-shadow: 20px 0 0 lightgray, -20px 0 0 lightgray;
  }
  &__select {
    @extend %container;
    flex-direction: column;

    /deep/ &--container {
      @extend %container;
    }
    // HTML <select>
    /deep/ &--item {
      width: 130px;
      height: 50px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 0 10px;
      font-size: 14px;
    }
    // HTML <option>
    /deep/ &--option {
      font-size: 14px;
      width: 130px;
      padding: 0 10px;
    }
  }
  &__button {
    @extend %container;
    &--reset {
      @extend %button;
    }
    &--submit {
      @extend %button;
      &.searchActive {
        color: white;
        background-color: $tealblue;
        &:hover {
          background-color: #0097d9;
        }
      }
    }
  }
}
</style>
