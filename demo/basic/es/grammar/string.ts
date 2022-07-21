const str = 'str'

str.includes('s')
str.startsWith('s')
str.endsWith('s')
str.repeat(2)

interface String {
    includes(searchString: string, position?: number): boolean;

    startsWith(searchString: string, position?: number): boolean;

    endsWith(searchString: string, endPosition?: number): boolean;

    repeat(count: number): string;
}