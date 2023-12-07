export const promisify = (func) => (...args) => {
    return new Promise((resolve, reject) => {
        let last = args[args.length - 1];
        if(typeof last === "function") {
            resolve(func(...args.slice(0, -1)));
        } else {
            resolve(func(...args));
        };
    });
};