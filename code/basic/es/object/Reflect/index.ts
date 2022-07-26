
declare namespace Reflect {
    // 等价于 target.apply(thisArgument, argumentsList)
    function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;

    // 等价于 new target(...argumentsList)
    function construct(target: Function, argumentsList: ArrayLike<any>, newTarget?: Function): any;

    // Object.defineProperty
    function defineProperty(target: object, propertyKey: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): boolean;

    // delete target[propertyKey]
    function deleteProperty(target: object, propertyKey: PropertyKey): boolean;

    // 相当于 target[propertyKey]
    // receiver接收器, 指定this
    function get(target: object, propertyKey: PropertyKey, receiver?: any): any;

    // Object.getOwnPropertyDescriptor
    function getOwnPropertyDescriptor(target: object, propertyKey: PropertyKey): PropertyDescriptor | undefined;

    // Object.getPrototypeOf
    function getPrototypeOf(target: object): object | null;

    // propertyKey in target
    function has(target: object, propertyKey: PropertyKey): boolean;

    // Object.isExtensible
    function isExtensible(target: object): boolean;

    // Object.getOwnPropertyNames + Object.getOwnPropertySymbols
    function ownKeys(target: object): (string | symbol)[];

    /**
     * Prevents the addition of new properties to an object.
     * @param target Object to make non-extensible.
     * @return Whether the object has been made non-extensible.
     */
    function preventExtensions(target: object): boolean;

    // [receiver || target][propertyKey] = value
    function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;

    // Object.setPrototypeOf
    function setPrototypeOf(target: object, proto: object | null): boolean;
}
