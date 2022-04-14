Math::[TAB] takes values from Math.{packages,functions}. Gives:
```
[
    "add" [function]
    "Advanced" [module]
]
```


### Packages (modules) and functions

```javascript
PACKAGES={
    "Math": {
        "files": [
            "/main.pl"
        ],
        "packages": [
            "Advanced"
        ],
        "functions": [
            "add"
        ]
    },
    "Math::Advanced": {
        "files": [
            "/main.pl"
        ],
        "packages": [],
        "functions": [
            "sqrt"
        ]
    },
    "main": {
        "files": [
            "/main.pl"
        ],
        "packages": [],
        "functions": [
            "greet"
        ]
    }
}

FUNCTIONS={
    "Math::add": [
        {
            "file": "/main.pl",
            "line": 21
        }
    ],
    "Math::Advanced::sqrt": [
        {
            "file": "/main.pl",
            "line": 37
        }
    ],
    "main::greet": [
        {
            "file": "/main.pl",
            "line": 10
        }
    ]
}
```

### Files

```javascript
FILES={
    "/main.pl": {
        // Array or Object?
        "packages": [
            {
                "packageName": "main",
                "line": 1
            },
            {
                "packageName": "Math",
                "line": 15
            }
            {
                "packageName": "Math::Advanced",
                "line": 30
            }
        ],
        "functions": [
            {
                "main::greet": {
                    "line": 1
                }
            }
        ]
    }
}
```

## On change

### Remove definitions of this file

We get `documentURI` (eg. `file:///main.pl`). We can then get the packages in this file from `file = FILES[documentURI]`:
```json
{
    "packages": [
        {
            "packageName": "main",
            "line": 1
        },
        {
            "packageName": "Math",
            "line": 15
        }
        {
            "packageName": "Math::Advanced",
            "line": 30
        }
    ]
}
```
Iterate over the packages and remove every package and function referenced in the old version of this file's definition:
```typescript
for (const p of file.packages) {
    const packagename = p.packageName;

    // Remove references to all functions defined in this file
    for (const f of PACKAGES[packagename].functions) {
        const funcFullName = `${packageName}::${f}`;

        FUNCTIONS[funcFullName].splice(FUNCTIONS[funcFullName].findIndex(f => f.file === documentURI)>>>0, 1);

        if (FUNCTIONS[funcFullName].length === 0) {
            delete FUNCTIONS[funcFullName];
        }
    }

    // Remove references to this file in PACKAGES
    PACKAGES[packageName].files.splice(PACKAGES[packageName].files.indexOf(documentURI)>>>0, 1);
    if (PACKAGES[packageName].files.length === 0) {
        delete PACKAGES[packageName];
    }
}

// And lastly delete the FILES reference to this file.
delete FILES[documentURI];

```
