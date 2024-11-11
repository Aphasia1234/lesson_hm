//ReferenceError: b is not defined
//  RHS 查找 失败的时候，会报出  ReferenceError 错误
function foo(a){
   console.log(a+b);
    b=a;
}
foo(2);