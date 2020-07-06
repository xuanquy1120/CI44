// console.log("hello")
// // const khong the thay doi gia tri
// let str="day la gia tri cua mang"
// console.log(str.startsWith('day'))
// console.log(str.endsWith('mang'))
// console.log(str.split(' '))
// let student={
//     name :' nguyen van a',
//     age: 18,
//     singAsong: function () {
//         console.log('sing hpbd song')
//     }
// }
// student.name='tran thi b'
// console.log(student.name)
// student.singAsong()
// // let a= new Array()
// let arr=[1,2,3,4,5]
// // them cuoi
// arr.push(6)
// // them dau
// arr.unshift(7)
// // xoa cuoi
// arr.pop()
// // xoa tu vi tri bao nhieu den bao nhieu so
// arr.splice(2,1)
// console.log(arr)
// // filter map
// // let a= function (){
    
// // }
// let a=()=>{

// }
// function Student() {
//     this.age=18
//     setTimeout(function () {
//         that.age =20
//     },100)
// }

let arr=[1,2,3,4,5];
let arr3=[];
let arr4=[];
    // cach goi function kieu cu 
    // function x2(number) {
    //     return number*2;
    // }
// cach goi function kieu moi
let x2 = (number) =>{
    return number*2;
} 
// for(let i=0;i<arr.length;i++){
//     arr3.push(x2(arr[i]))
// }
// map lay cac phan tu ra va thuc hien lenh
arr3=arr.map(item=>{
    return item*2;
})
// filter lay cac phan tu ra theo dieu kien
arr4=arr3.filter(item=>{
    return item>6;
})
console.log(arr3)
console.log(arr4)
let buttonDemo = document.getElementById('demo')
buttonDemo.addEventListener('click',(e)=>{
    document.getElementById("heading1").innerText = 'da thay doi'
    // document.getElementById("heading1").style = 'dispaly:none'
})