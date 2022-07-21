for (let i = 0; i < 3; i++) {
    let i = 'hello'
    console.log(i);
}

// 作用域
{
    // 父级块级作用域
    let i = 3

    {
        // 内部块级作用域
        let i = 'hello'
        console.log(i)
    }
}