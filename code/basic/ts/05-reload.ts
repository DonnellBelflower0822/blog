function add(x: number, y: number): number
function add(x: string, y: string): string
function add(x: number, y: string): number
function add(x: string, y: number): string

type Combinable = string | number;

function add(x: Combinable, y: Combinable) {
    if (typeof x === 'string' && typeof y === 'string') {
        return 'x-string y-string'
    }

    if (typeof x === 'number' && typeof y === 'number') {
        return 1
    }

    if (typeof x === 'number' && typeof y === 'string') {
        return 2
    }

    if (typeof x === 'string' && typeof y === 'number') {
        return 'hello'
    }
}