for (let i = 0; i < 3; i++) {
    console.log(i);
}

// 作用域
{
    // 父级块级作用域
    let i

    {
        // 内部块级作用域
        // console.log(i)
    }
}