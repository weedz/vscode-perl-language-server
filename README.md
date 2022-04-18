# Perl language server for vscode

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/weedz/vscode-perl-language-server?include_prereleases&style=for-the-badge)](https://github.com/weedz/vscode-perl-language-server/releases)

Performs a really basic static analyze of perl code to provide the following:

- Workspace and document symbol definitions (packages and functions)
- Goto definition (packages and functions)
- Autocomplete (packages and functions)

The way this is implemented means the following perl program will create a function symbol `hello`:
```perl
my $str = q^
sub hello {
  print "world!";
}^;
```
I will not parse perl in any way so this is unfortunately a limitation of the current implementation.

## Installation

Prepackaged vscode extension is available from the [releases](https://github.com/weedz/vscode-perl-language-server/releases)

Download and then open the command palatte in vscode and search for "Extension: Install from VSIX..." and select the downloaded file.

### From source

Install all dependencies:
```console
npm install
```

To package a vscode extension (`.vsix`) you will need the package `vsce`:
```console
npm install -g vsce
```

You can now run:
```console
vsce package
```


## Development

Run the watch script:
```console
npm run esbuild-watch
```

Should now be able to "debug" the extension with "Run > Start Debugging (<kbd>F5</kbd>)"
