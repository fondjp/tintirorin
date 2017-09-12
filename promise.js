function asyncProcess(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve("入力値：" + value);
      } else {
        refect("入力は空です");
      }
    }, 500);
  });
}

asyncProcess("fondjp").then(
  response => {
    console.log(response);
  },
  error => {
    console.log("エラー：" + error);
  }
);

setTimeout(() => { console.log("aaaa") }, 10000);