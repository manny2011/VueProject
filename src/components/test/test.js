const { default: axios } = require('axios');
const fs = require('fs');
const { resolve } = require('path');
const $ = require('../../../../node_modules/jquery/dist/jquery')

console.log($.toString);

fs.readFile('./a.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
})
///使用promise改造
const p = new Promise((resolve, reject) => {
  fs.readFile('./a.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      return reject(err);
    }
    resolve(data);
  })
})

p.then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

//使用promise读取多个文件
function fn(filePaths) {
  const p = new Promise((resolve, reject) => {
    fs.readFile(filePaths, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    })
  })
  return p;
}
console.log(fn('./a.txt'));

async function f1() {//await 后面必须跟的是一个Promise对象,比如await axios.get();
  try {
    let res = await fn('./a1.txt')
    console.log("f1: " + res);
  } catch (err) {
    console.log("f1: " + err);
  }
}

f1();

async function f2() {
  try {
    let res = await axios.get('http://www.baidu.com')//await + promise obj
    console.log("f2: " + res);
  } catch (err) {
    console.log("f2: " + err);
  }
}
f2()

async function f3() {

  let res = await Promise.all([
    axios.get('http://localhost:3000/one'),
    axios.get('http://localhost:3000/two'),
    axios.get('http://localhost:3000/three'),
  ])
  console.log(res);
}
f3()

async function f4() {

  let res = await Promise.race([
    axios.get('http://localhost:3000/one'),
    axios.get('http://localhost:3000/two'),
    axios.get('http://localhost:3000/three'),
  ])
  console.log(res);
}
f4()

function f5() {
  $.ajax({
    url: 'http://www.baidu.com',
    type: 'get',
    success: res => {
      console.log(res);
    },
    error: err => {
      console.log(err);
    }
  })
}

// f5()


