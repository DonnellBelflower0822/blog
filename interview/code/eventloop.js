// 第1轮
// const microtask = [process1,then1,then2]
// const macrotask = [setTimeout1]

// 第2轮
// const microtask = [then1,then2]
// const macrotask = [setTimeout1]

// 第3轮
// const microtask = [then2]
// const macrotask = [setTimeout1]

// 第4轮
// const microtask = []
// const macrotask = [setTimeout1]

// 第5轮
// const microtask = [process2,then3]
// const macrotask = []

// 第6轮
// const microtask = [then3]
// const macrotask = []

// 第7轮
// const microtask = []
// const macrotask = []

// 1. 同步任务
console.log('1'); // [1]

// function async1() {
//   console.log('2');    // [2]
//  async2().then(
//   ()=>{  // then1微任务
//     console.log('3');    // [7]
//   });
// }
async function async1() {
  console.log('2');
  await async2();
  console.log('3');
}

// function async2(){
//   return new Promise(resolve=>{
//     console.log(4)     // [3]
//     resolve()
//   })
// }
async function async2() {
  console.log('4');
}

// 注册process1微任务
process.nextTick( // process1
  function () {
    console.log('5'); // [6]
  }
)

// 注册setTimeout1宏任务
setTimeout( // setTimeout1
  function () {
    console.log('6');   // [9]
    process.nextTick(
      function () {   // process2
        console.log('7'); // [11]
      }
    )
    new Promise(function (resolve) {
      console.log('8'); // [10]
      resolve();
    }).then(    // then3 微任务
      function () {
        console.log('9')  // [12]
      }
    )
  }
)

async1();

new Promise(function (resolve) {
  console.log('10');  // [4]
  resolve();
}).then(    // then2 微任务
  function () {
    console.log('11');  // [8]
  }
);
console.log('12');    // [5]