var data: Array<() => void> = [];

for (let i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}

data[0]();
data[1]();
data[2]();

interface LetGlobalContext {
    VO: {
        data: Array<() => void> | undefined
    }
}

interface BlockContext {
    VO: {
        i: number,
        // Scopes: [LetGlobalContext.VO, BlockContext.VO]
        // 所以i的存在于BlockContext.VO
        unknowFn: () => {}
    }
}