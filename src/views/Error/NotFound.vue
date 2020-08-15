<template>
    <div class="not-found">
        <div class="not-found-content">
            <h1>404</h1>
            <p>哎呀，您找的页面丢失了~~</p>
            <a href="/">返回首页>></a>
            <div>
                <img src="../../assets/images/common/404.png" alt="404"/>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.not-found {
  width: 100%;
  background-color: #fff;

  &-content {
    height: 100vh;
    padding-top: 100px;
    margin: 0 auto;
    color: #6a6a6a;
    text-align: center;
    box-sizing: border-box;

    h1 {
      margin-bottom: 20px;
      font-size: 50px;
    }

    p {
      font-size: 18px;
    }

    a {
      display: inline-block;
      margin-top: 20px;
      margin-bottom: 50px;
      font-size: 18px;
      color: #6a6a6a;
    }

    img {
      width: 266px;
    }
  }
}
</style>
