/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT https://github.com/electricessence/TypeScript.NET/blob/master/LICENSE.md
 */
export declare class Functions {
    Identity<T>(x: T): T;
    True(): boolean;
    False(): boolean;
    Blank(): void;
}
export declare module Functions {
    var Identity: <T>(x: T) => T;
    var True: () => boolean;
    var False: () => boolean;
    var Blank: () => void;
}
export default Functions;
