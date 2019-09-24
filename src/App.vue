<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  font-family: "Open Sans", sans-serif;
  padding: 0px;
  margin: 0px;
}

.header {
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 3px 20px -8px black;
  padding: 20px 0px;

  .header-title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .current {
    width: 100%;
    text-align: center;
    font-weight: 300;

    .toggleAddCollection {
      font-weight: bold;
      font-size: 20px;
      background: black;
      border-radius: 50%;
      position: absolute;
      width: 30px;
      height: 30px;
      bottom: 10px;
      right: 10px;
      color: white;
    }
  }
}

.places {
  width: 100%;
  padding: 50px 20px;
  padding-bottom: 100px;
  padding-top: 130px;

  .place-wrapper {
    margin-bottom: 20px;

    .place {
      width: 100%;
      border: 1px solid black;
      padding: 10px 20px;
      position: relative;
      font-size: 18px;

      .toggleAddItem {
        text-align: center;
        background: white;
        color: black;
        font-size: 20px;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
      }

      &.selected {
        background-color: black;
        color: white;
        font-weight: bold;

        .toggleAddItem {
          display: block;
        }
      }
    }

    .place-items {
      border-left: 5px solid black;
      padding-top: 15px;
      padding-left: 20px;
      padding-right: 10px;

      .item {
        width: 100%;
        background: #eee;
        margin-bottom: 10px;
        padding: 10px 20px;
        border-radius: 5px;
        position: relative;

        .removeItem {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 25px;
          height: 25px;
          background: red;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          text-align: center;
          right: 10px;
          color: white;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}

.addCollection,
.addItem {
  color: white;
  text-align: center;
  padding: 20px 40px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  box-shadow: 0px 0px 50px -20px black;
  z-index: 2;
  background-color: black;
  transition: 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  &.hidden {
    transform: translateY(150%);
  }

  form {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    input {
      outline: none;
      border: none;
      border-bottom: 1px solid white;
      padding: 5px;
      font-size: 20px;
      font-weight: 600;
      width: 100%;
      color: white;
      background: black;
    }

    button {
      border: none;
      outline: none;
      background-color: white;
      color: black;
      font-weight: bold;
      padding: 10px 20px;
      margin-left: 10px;
      text-transform: uppercase;
      font-size: 16px;
    }
  }
}
</style>
