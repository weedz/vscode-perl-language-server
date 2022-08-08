export const builtin_functions: Record<string, {
    link: string
    arguments: Array<{
        name: string
    }>
}> = {
    // splice ARRAY,OFFSET,LENGTH,LIST (https://perldoc.perl.org/functions/splice)
    splice: {
        link: "https://perldoc.perl.org/functions/splice",
        arguments: [
            { name: "@ARRAY" },
            { name: "$OFFSET" },
            { name: "$LENGTH" },
            { name: "@LIST" },
        ]
    },
    // shift ARRAY (https://perldoc.perl.org/functions/shift)
    shift: {
        link: "https://perldoc.perl.org/functions/shift",
        arguments: [
            { name: "@ARRAY" },
        ]
    },
    // push ARRAY,LIST (https://perldoc.perl.org/functions/push)
    push: {
        link: "https://perldoc.perl.org/functions/push",
        arguments: [
            { name: "@ARRAY" },
            { name: "@LIST" },
        ]
    },
    // substr EXPR,OFFSET,LENGTH,REPLACEMENT (https://perldoc.perl.org/functions/substr)
    substr: {
        link: "https://perldoc.perl.org/functions/substr",
        arguments: [
            { name: "$EXPR" },
            { name: "$OFFSET" },
            { name: "$LENGTH" },
            { name: "$REPLACEMENT" },
        ]
    }
};
