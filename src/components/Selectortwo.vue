<template>
  <div :class="cls" class="home__select--container">
    <p class="line--title">{{ title }}</p>
    <!-- components 起點__選擇線 -->
    <select
      class="line--select home__select--item"
      :value="lineVmodel"
      @change="getStationData"
      required
    >
      <option
        :value="null"
        class="line--option home__select--option"
        disabled
        hidden
        selected
      >
        尚未選取
      </option>
      <option
        class="line--option home__select--option"
        v-for="item in lineData"
        :key="item"
        :value="item.LineID"
      >
        {{ item.LineID }}{{ item.LineName.Zh_tw }}
      </option>
    </select>
    <!-- components 起點__選擇站 -->
    <select
      class="station--select home__select--item"
      :value="stationVmodel"
      @change="StationChange"
      required
    >
      <option
        :value="null"
        class="station--option home__select--option"
        disabled
        hidden
        selected
      >
        尚未選取
      </option>
      <option
        class="station--option home__select--option"
        v-for="item in stationData.Stations"
        :key="item"
        :value="item.StationID"
      >
        {{ item.StationName.Zh_tw }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: [
    "cls",
    "title",
    "lineVmodel",
    "lineData",
    "stationVmodel",
    "stationData",
  ],
  methods: {
    getStationData(e) {
      this.$emit("getStationDataHook", e.target.value);
      // this.$emit("getStartStationDataHook", e.target.value);
      // this.$emit("getEndStationDataHook", e.target.value);
    },
    StationChange(e) {
      this.$emit("update:stationVmodel", e.target.value);

      this.$emit("stationChangeHook", e.target.value);
      // this.$emit("StartstationChangeHook", e.target.value);
      // this.$emit("EndstationChangeHook", e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
