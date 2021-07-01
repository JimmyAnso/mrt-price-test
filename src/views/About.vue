<template>
  <div class="about">
    <div class="about__header">
      <img src="../../public/image/about.png" alt="" class="pic" />
      <div class="txt">
        <h3>林俊安</h3>
        <h3>Jimmy Lin</h3>
        <a href="https://tw.mail.yahoo.com/d/folders/1?.intl=tw&.lang=zh-Hant-TW" target="_blank">jimmy123698745@yahoo.com.tw</a>
      </div>
    </div>
    <div class="about__title">認知，決定看世界的視角。</div>
    <div class="about__content">
      <h2>關於台北捷運票價查詢</h2>
      <p>
        介紹自己學習的過程：起初連 webAPI
        是甚麼都不知道，並從頭去了解以JavaScript的原生寫法為基礎的
        ajax、$ajax，與以Promise語法為基礎去實現ajax的fetch、axios的操作，在過程中也認識了同步與非同步的應用，以及在API出錯時，可以應用
        try、catch
        來自訂資料錯誤時的處理。在開發的過程中也應用到vue的components，在子主組與父層之間的資料傳遞上也卡關一陣子，嘗試props
        in event out
        許久，但同時也學習到v-model的原始樣貌。頁面做得差不多之後，開始串聯
        router ，並藉由網路上的教學影片、專案實例、vue文本重複閱讀，才認識了vue
        router的聲明式與編程式，以及透過路由在組件之間傳遞參數的兩種方法「命名路由」、「查詢參數」;「命名路由」需要在路由註冊router的name可以使用，且若刷新頁面參數將會遺失；「查詢參數」則會在路由網址後面帶入參數並且傳遞參數，刷新頁面參數不會遺失;歷經兩周左右最終完成本作品!!!
      </p>
    </div>
    <div class="about__tech">
      <h2>Technology Stack</h2>
      <ul>
        <li>vue</li>
        <li>axios</li>
        <li>props in event out</li>
        <li>scss</li>
        <li>router</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+TC:wght@100;300;400;500;700;900&family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap");
$tealblue: #007ab0;

.about {
  margin-bottom: 50px;
  &__header {
    display: flex;
    justify-content: center;
    .pic {
      width: 100px;
      height: 100px;
      padding-right: 10px;
    }
    .txt {
      text-align: left;
      h3 {
        font-weight: 500;
      }
    }
  }
  &__title {
    padding: 10px;
    background-color: #eee;
    border-left: 8px solid $tealblue;
    margin-top: 20px;
  }
  &__content {
    margin-top: 40px;
    h2 {
      font-family: "Noto Serif TC", serif;
    }
    p {
      margin-top: 20px;
    }
  }
  &__tech {
    margin-top: 40px;
    h2 {
      font-family: "Noto Serif TC", serif;
    }
    ul {
      margin-top: 20px;
      padding-left: 12px;
      list-style: none;
      li::before {
        content: "\2022";
        color: lightgray;
        font-weight: bold;
        display: inline-block;
        width: 1em;
        padding-right: 12px;
      }
    }
  }
}
</style>