# Perl language server for vscode

## :warning: This project is not being maintained

Unfortunately, the former maintainer no longer have the time and/or resources to work on this project. For more information see this [issue](https://github.com/weedz/vscode-perl-language-server/issues/2).

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/linus-bjorklund.perl-lsp?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=linus-bjorklund.perl-lsp)

Performs a really basic static analyze of perl code to provide the following:

- Workspace and document symbol definitions (packages and functions)
- Goto definition (packages and functions)
- Autocomplete (packages and functions)
- Signature help

Including completion and signature help for most [builtin functions](https://metacpan.org/dist/perl/view/pod/perlfunc.pod)

The way this is implemented means the following perl program will create a function symbol `hello`:
```perl
my $str = q^
sub hello {
  print "world!";
}^;
```
I will not parse perl in any way so this is unfortunately a limitation of the current implementation.

## Installation

Available from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=linus-bjorklund.perl-lsp).

or

Prepackaged vscode extension is available from the [releases](https://github.com/weedz/vscode-perl-language-server/releases).

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
