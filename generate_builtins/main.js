import { writeFile } from "fs/promises";
import builtins from "./builtins.json" assert {type: 'json'};
/*

const list = document.querySelectorAll("body > div.container-fluid.page-pod > div:nth-child(2) > div > div.content > div > dl:nth-child(26) > dt")
const perlfuncs = Array.from(list).map(item => {
    return {
        name: item.textContent,
        link: item.querySelector("a").href
    }
})
copy(perlfuncs)

*/

const ignored_functions = new Set([
    "-X",
    "m//",
    "s///",
    "tr///",
    "y///",
    "continue",
    "do",
    "__FILE__",
    // "grep",
    "__LINE__",
    // "map",
    "__PACKAGE__",
    "q/STRING/",
    "qq/STRING/",
    "qw/STRING/",
    "qx/STRING/",
    "qr/STRING/",
    // "sort",
    "sub",
    "__SUB__",
]);

/**
 * @type Record<string, Array<{
 *      link: string
 *      arguments: string[]
 * }>
 */
const functions = {};

for (const f of builtins) {
    const [functionName, ...args] = f.name.split(" ");
    if (ignored_functions.has(functionName)) {
        continue;
    }

    if (!functions[functionName]) {
        functions[functionName] = [];
    }
    functions[functionName].push({
        link: f.link,
        arguments: args.filter(Boolean).flatMap(arg => {
            return arg.split(",");
        }),
    });
}

await writeFile("./parsed_builtin_functions.json", JSON.stringify(functions, null, 4));
