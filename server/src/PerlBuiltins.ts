export const builtin_functions: Record<string, Array<{
    link: string
    arguments: string[]
}>> = {
    "abs": [
        {
            "link": "https://metacpan.org/pod/perlfunc#abs-VALUE",
            "arguments": [
                "VALUE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#abs1",
            "arguments": []
        }
    ],
    "accept": [
        {
            "link": "https://metacpan.org/pod/perlfunc#accept-NEWSOCKET,GENERICSOCKET",
            "arguments": [
                "NEWSOCKET",
                "GENERICSOCKET"
            ]
        }
    ],
    "alarm": [
        {
            "link": "https://metacpan.org/pod/perlfunc#alarm-SECONDS",
            "arguments": [
                "SECONDS"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#alarm1",
            "arguments": []
        }
    ],
    "atan2": [
        {
            "link": "https://metacpan.org/pod/perlfunc#atan2-Y,X",
            "arguments": [
                "Y",
                "X"
            ]
        }
    ],
    "bind": [
        {
            "link": "https://metacpan.org/pod/perlfunc#bind-SOCKET,NAME",
            "arguments": [
                "SOCKET",
                "NAME"
            ]
        }
    ],
    "binmode": [
        {
            "link": "https://metacpan.org/pod/perlfunc#binmode-FILEHANDLE,-LAYER",
            "arguments": [
                "FILEHANDLE",
                "",
                "LAYER"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#binmode-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        }
    ],
    "bless": [
        {
            "link": "https://metacpan.org/pod/perlfunc#bless-REF,CLASSNAME",
            "arguments": [
                "REF",
                "CLASSNAME"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#bless-REF",
            "arguments": [
                "REF"
            ]
        }
    ],
    "break": [
        {
            "link": "https://metacpan.org/pod/perlfunc#break",
            "arguments": []
        }
    ],
    "caller": [
        {
            "link": "https://metacpan.org/pod/perlfunc#caller-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#caller1",
            "arguments": []
        }
    ],
    "chdir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chdir-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chdir-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chdir-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chdir3",
            "arguments": []
        }
    ],
    "chmod": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chmod-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "chomp": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chomp-VARIABLE",
            "arguments": [
                "VARIABLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chomp2",
            "arguments": []
        }
    ],
    "chomp(": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chomp(-LIST-)",
            "arguments": [
                "LIST",
                ")"
            ]
        }
    ],
    "chop": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chop-VARIABLE",
            "arguments": [
                "VARIABLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chop2",
            "arguments": []
        }
    ],
    "chop(": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chop(-LIST-)",
            "arguments": [
                "LIST",
                ")"
            ]
        }
    ],
    "chown": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chown-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "chr": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chr-NUMBER",
            "arguments": [
                "NUMBER"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chr1",
            "arguments": []
        }
    ],
    "chroot": [
        {
            "link": "https://metacpan.org/pod/perlfunc#chroot-FILENAME",
            "arguments": [
                "FILENAME"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#chroot1",
            "arguments": []
        }
    ],
    "close": [
        {
            "link": "https://metacpan.org/pod/perlfunc#close-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#close1",
            "arguments": []
        }
    ],
    "closedir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#closedir-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        }
    ],
    "connect": [
        {
            "link": "https://metacpan.org/pod/perlfunc#connect-SOCKET,NAME",
            "arguments": [
                "SOCKET",
                "NAME"
            ]
        }
    ],
    "cos": [
        {
            "link": "https://metacpan.org/pod/perlfunc#cos-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#cos1",
            "arguments": []
        }
    ],
    "crypt": [
        {
            "link": "https://metacpan.org/pod/perlfunc#crypt-PLAINTEXT,SALT",
            "arguments": [
                "PLAINTEXT",
                "SALT"
            ]
        }
    ],
    "dbmclose": [
        {
            "link": "https://metacpan.org/pod/perlfunc#dbmclose-HASH",
            "arguments": [
                "HASH"
            ]
        }
    ],
    "dbmopen": [
        {
            "link": "https://metacpan.org/pod/perlfunc#dbmopen-HASH,DBNAME,MASK",
            "arguments": [
                "HASH",
                "DBNAME",
                "MASK"
            ]
        }
    ],
    "defined": [
        {
            "link": "https://metacpan.org/pod/perlfunc#defined-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#defined1",
            "arguments": []
        }
    ],
    "delete": [
        {
            "link": "https://metacpan.org/pod/perlfunc#delete-EXPR",
            "arguments": [
                "EXPR"
            ]
        }
    ],
    "die": [
        {
            "link": "https://metacpan.org/pod/perlfunc#die-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "dump": [
        {
            "link": "https://metacpan.org/pod/perlfunc#dump-LABEL",
            "arguments": [
                "LABEL"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#dump-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#dump2",
            "arguments": []
        }
    ],
    "each": [
        {
            "link": "https://metacpan.org/pod/perlfunc#each-HASH",
            "arguments": [
                "HASH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#each-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        }
    ],
    "eof": [
        {
            "link": "https://metacpan.org/pod/perlfunc#eof-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#eof-()",
            "arguments": [
                "()"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#eof2",
            "arguments": []
        }
    ],
    "eval": [
        {
            "link": "https://metacpan.org/pod/perlfunc#eval-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#eval-BLOCK",
            "arguments": [
                "BLOCK"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#eval2",
            "arguments": []
        }
    ],
    "evalbytes": [
        {
            "link": "https://metacpan.org/pod/perlfunc#evalbytes-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#evalbytes1",
            "arguments": []
        }
    ],
    "exec": [
        {
            "link": "https://metacpan.org/pod/perlfunc#exec-LIST",
            "arguments": [
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#exec-PROGRAM-LIST",
            "arguments": [
                "PROGRAM",
                "LIST"
            ]
        }
    ],
    "exists": [
        {
            "link": "https://metacpan.org/pod/perlfunc#exists-EXPR",
            "arguments": [
                "EXPR"
            ]
        }
    ],
    "exit": [
        {
            "link": "https://metacpan.org/pod/perlfunc#exit-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#exit1",
            "arguments": []
        }
    ],
    "exp": [
        {
            "link": "https://metacpan.org/pod/perlfunc#exp-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#exp1",
            "arguments": []
        }
    ],
    "fc": [
        {
            "link": "https://metacpan.org/pod/perlfunc#fc-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#fc1",
            "arguments": []
        }
    ],
    "fcntl": [
        {
            "link": "https://metacpan.org/pod/perlfunc#fcntl-FILEHANDLE,FUNCTION,SCALAR",
            "arguments": [
                "FILEHANDLE",
                "FUNCTION",
                "SCALAR"
            ]
        }
    ],
    "fileno": [
        {
            "link": "https://metacpan.org/pod/perlfunc#fileno-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#fileno-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        }
    ],
    "flock": [
        {
            "link": "https://metacpan.org/pod/perlfunc#flock-FILEHANDLE,OPERATION",
            "arguments": [
                "FILEHANDLE",
                "OPERATION"
            ]
        }
    ],
    "fork": [
        {
            "link": "https://metacpan.org/pod/perlfunc#fork",
            "arguments": []
        }
    ],
    "format": [
        {
            "link": "https://metacpan.org/pod/perlfunc#format",
            "arguments": []
        }
    ],
    "formline": [
        {
            "link": "https://metacpan.org/pod/perlfunc#formline-PICTURE,LIST",
            "arguments": [
                "PICTURE",
                "LIST"
            ]
        }
    ],
    "getc": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getc-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#getc1",
            "arguments": []
        }
    ],
    "getlogin": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getlogin",
            "arguments": []
        }
    ],
    "getpeername": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpeername-SOCKET",
            "arguments": [
                "SOCKET"
            ]
        }
    ],
    "getpgrp": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpgrp-PID",
            "arguments": [
                "PID"
            ]
        }
    ],
    "getppid": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getppid",
            "arguments": []
        }
    ],
    "getpriority": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpriority-WHICH,WHO",
            "arguments": [
                "WHICH",
                "WHO"
            ]
        }
    ],
    "getpwnam": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpwnam-NAME",
            "arguments": [
                "NAME"
            ]
        }
    ],
    "getgrnam": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getgrnam-NAME",
            "arguments": [
                "NAME"
            ]
        }
    ],
    "gethostbyname": [
        {
            "link": "https://metacpan.org/pod/perlfunc#gethostbyname-NAME",
            "arguments": [
                "NAME"
            ]
        }
    ],
    "getnetbyname": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getnetbyname-NAME",
            "arguments": [
                "NAME"
            ]
        }
    ],
    "getprotobyname": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getprotobyname-NAME",
            "arguments": [
                "NAME"
            ]
        }
    ],
    "getpwuid": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpwuid-UID",
            "arguments": [
                "UID"
            ]
        }
    ],
    "getgrgid": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getgrgid-GID",
            "arguments": [
                "GID"
            ]
        }
    ],
    "getservbyname": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getservbyname-NAME,PROTO",
            "arguments": [
                "NAME",
                "PROTO"
            ]
        }
    ],
    "gethostbyaddr": [
        {
            "link": "https://metacpan.org/pod/perlfunc#gethostbyaddr-ADDR,ADDRTYPE",
            "arguments": [
                "ADDR",
                "ADDRTYPE"
            ]
        }
    ],
    "getnetbyaddr": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getnetbyaddr-ADDR,ADDRTYPE",
            "arguments": [
                "ADDR",
                "ADDRTYPE"
            ]
        }
    ],
    "getprotobynumber": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getprotobynumber-NUMBER",
            "arguments": [
                "NUMBER"
            ]
        }
    ],
    "getservbyport": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getservbyport-PORT,PROTO",
            "arguments": [
                "PORT",
                "PROTO"
            ]
        }
    ],
    "getpwent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getpwent",
            "arguments": []
        }
    ],
    "getgrent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getgrent",
            "arguments": []
        }
    ],
    "gethostent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#gethostent",
            "arguments": []
        }
    ],
    "getnetent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getnetent",
            "arguments": []
        }
    ],
    "getprotoent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getprotoent",
            "arguments": []
        }
    ],
    "getservent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getservent",
            "arguments": []
        }
    ],
    "setpwent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setpwent",
            "arguments": []
        }
    ],
    "setgrent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setgrent",
            "arguments": []
        }
    ],
    "sethostent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sethostent-STAYOPEN",
            "arguments": [
                "STAYOPEN"
            ]
        }
    ],
    "setnetent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setnetent-STAYOPEN",
            "arguments": [
                "STAYOPEN"
            ]
        }
    ],
    "setprotoent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setprotoent-STAYOPEN",
            "arguments": [
                "STAYOPEN"
            ]
        }
    ],
    "setservent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setservent-STAYOPEN",
            "arguments": [
                "STAYOPEN"
            ]
        }
    ],
    "endpwent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endpwent",
            "arguments": []
        }
    ],
    "endgrent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endgrent",
            "arguments": []
        }
    ],
    "endhostent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endhostent",
            "arguments": []
        }
    ],
    "endnetent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endnetent",
            "arguments": []
        }
    ],
    "endprotoent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endprotoent",
            "arguments": []
        }
    ],
    "endservent": [
        {
            "link": "https://metacpan.org/pod/perlfunc#endservent",
            "arguments": []
        }
    ],
    "getsockname": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getsockname-SOCKET",
            "arguments": [
                "SOCKET"
            ]
        }
    ],
    "getsockopt": [
        {
            "link": "https://metacpan.org/pod/perlfunc#getsockopt-SOCKET,LEVEL,OPTNAME",
            "arguments": [
                "SOCKET",
                "LEVEL",
                "OPTNAME"
            ]
        }
    ],
    "glob": [
        {
            "link": "https://metacpan.org/pod/perlfunc#glob-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#glob1",
            "arguments": []
        }
    ],
    "gmtime": [
        {
            "link": "https://metacpan.org/pod/perlfunc#gmtime-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#gmtime1",
            "arguments": []
        }
    ],
    "goto": [
        {
            "link": "https://metacpan.org/pod/perlfunc#goto-LABEL",
            "arguments": [
                "LABEL"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#goto-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#goto-&NAME",
            "arguments": [
                "&NAME"
            ]
        }
    ],
    "grep": [
        {
            "link": "https://metacpan.org/pod/perlfunc#grep-BLOCK-LIST",
            "arguments": [
                "BLOCK",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#grep-EXPR,LIST",
            "arguments": [
                "EXPR",
                "LIST"
            ]
        }
    ],
    "hex": [
        {
            "link": "https://metacpan.org/pod/perlfunc#hex-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#hex1",
            "arguments": []
        }
    ],
    "import": [
        {
            "link": "https://metacpan.org/pod/perlfunc#import-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "index": [
        {
            "link": "https://metacpan.org/pod/perlfunc#index-STR,SUBSTR,POSITION",
            "arguments": [
                "STR",
                "SUBSTR",
                "POSITION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#index-STR,SUBSTR",
            "arguments": [
                "STR",
                "SUBSTR"
            ]
        }
    ],
    "int": [
        {
            "link": "https://metacpan.org/pod/perlfunc#int-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#int1",
            "arguments": []
        }
    ],
    "ioctl": [
        {
            "link": "https://metacpan.org/pod/perlfunc#ioctl-FILEHANDLE,FUNCTION,SCALAR",
            "arguments": [
                "FILEHANDLE",
                "FUNCTION",
                "SCALAR"
            ]
        }
    ],
    "join": [
        {
            "link": "https://metacpan.org/pod/perlfunc#join-EXPR,LIST",
            "arguments": [
                "EXPR",
                "LIST"
            ]
        }
    ],
    "keys": [
        {
            "link": "https://metacpan.org/pod/perlfunc#keys-HASH",
            "arguments": [
                "HASH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#keys-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        }
    ],
    "kill": [
        {
            "link": "https://metacpan.org/pod/perlfunc#kill-SIGNAL,-LIST",
            "arguments": [
                "SIGNAL",
                "",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#kill-SIGNAL",
            "arguments": [
                "SIGNAL"
            ]
        }
    ],
    "last": [
        {
            "link": "https://metacpan.org/pod/perlfunc#last-LABEL",
            "arguments": [
                "LABEL"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#last-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#last2",
            "arguments": []
        }
    ],
    "lc": [
        {
            "link": "https://metacpan.org/pod/perlfunc#lc-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#lc1",
            "arguments": []
        }
    ],
    "lcfirst": [
        {
            "link": "https://metacpan.org/pod/perlfunc#lcfirst-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#lcfirst1",
            "arguments": []
        }
    ],
    "length": [
        {
            "link": "https://metacpan.org/pod/perlfunc#length-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#length1",
            "arguments": []
        }
    ],
    "link": [
        {
            "link": "https://metacpan.org/pod/perlfunc#link-OLDFILE,NEWFILE",
            "arguments": [
                "OLDFILE",
                "NEWFILE"
            ]
        }
    ],
    "listen": [
        {
            "link": "https://metacpan.org/pod/perlfunc#listen-SOCKET,QUEUESIZE",
            "arguments": [
                "SOCKET",
                "QUEUESIZE"
            ]
        }
    ],
    "local": [
        {
            "link": "https://metacpan.org/pod/perlfunc#local-EXPR",
            "arguments": [
                "EXPR"
            ]
        }
    ],
    "localtime": [
        {
            "link": "https://metacpan.org/pod/perlfunc#localtime-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#localtime1",
            "arguments": []
        }
    ],
    "lock": [
        {
            "link": "https://metacpan.org/pod/perlfunc#lock-THING",
            "arguments": [
                "THING"
            ]
        }
    ],
    "log": [
        {
            "link": "https://metacpan.org/pod/perlfunc#log-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#log1",
            "arguments": []
        }
    ],
    "lstat": [
        {
            "link": "https://metacpan.org/pod/perlfunc#lstat-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#lstat-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#lstat-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#lstat3",
            "arguments": []
        }
    ],
    "map": [
        {
            "link": "https://metacpan.org/pod/perlfunc#map-BLOCK-LIST",
            "arguments": [
                "BLOCK",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#map-EXPR,LIST",
            "arguments": [
                "EXPR",
                "LIST"
            ]
        }
    ],
    "mkdir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#mkdir-FILENAME,MODE",
            "arguments": [
                "FILENAME",
                "MODE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#mkdir-FILENAME",
            "arguments": [
                "FILENAME"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#mkdir2",
            "arguments": []
        }
    ],
    "msgctl": [
        {
            "link": "https://metacpan.org/pod/perlfunc#msgctl-ID,CMD,ARG",
            "arguments": [
                "ID",
                "CMD",
                "ARG"
            ]
        }
    ],
    "msgget": [
        {
            "link": "https://metacpan.org/pod/perlfunc#msgget-KEY,FLAGS",
            "arguments": [
                "KEY",
                "FLAGS"
            ]
        }
    ],
    "msgrcv": [
        {
            "link": "https://metacpan.org/pod/perlfunc#msgrcv-ID,VAR,SIZE,TYPE,FLAGS",
            "arguments": [
                "ID",
                "VAR",
                "SIZE",
                "TYPE",
                "FLAGS"
            ]
        }
    ],
    "msgsnd": [
        {
            "link": "https://metacpan.org/pod/perlfunc#msgsnd-ID,MSG,FLAGS",
            "arguments": [
                "ID",
                "MSG",
                "FLAGS"
            ]
        }
    ],
    "my": [
        {
            "link": "https://metacpan.org/pod/perlfunc#my-VARLIST",
            "arguments": [
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#my-TYPE-VARLIST",
            "arguments": [
                "TYPE",
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#my-VARLIST-:-ATTRS",
            "arguments": [
                "VARLIST",
                ":",
                "ATTRS"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#my-TYPE-VARLIST-:-ATTRS",
            "arguments": [
                "TYPE",
                "VARLIST",
                ":",
                "ATTRS"
            ]
        }
    ],
    "next": [
        {
            "link": "https://metacpan.org/pod/perlfunc#next-LABEL",
            "arguments": [
                "LABEL"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#next-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#next2",
            "arguments": []
        }
    ],
    "no": [
        {
            "link": "https://metacpan.org/pod/perlfunc#no-MODULE-VERSION-LIST",
            "arguments": [
                "MODULE",
                "VERSION",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#no-MODULE-VERSION",
            "arguments": [
                "MODULE",
                "VERSION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#no-MODULE-LIST",
            "arguments": [
                "MODULE",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#no-MODULE",
            "arguments": [
                "MODULE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#no-VERSION",
            "arguments": [
                "VERSION"
            ]
        }
    ],
    "oct": [
        {
            "link": "https://metacpan.org/pod/perlfunc#oct-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#oct1",
            "arguments": []
        }
    ],
    "open": [
        {
            "link": "https://metacpan.org/pod/perlfunc#open-FILEHANDLE,MODE,EXPR",
            "arguments": [
                "FILEHANDLE",
                "MODE",
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#open-FILEHANDLE,MODE,EXPR,LIST",
            "arguments": [
                "FILEHANDLE",
                "MODE",
                "EXPR",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#open-FILEHANDLE,MODE,REFERENCE",
            "arguments": [
                "FILEHANDLE",
                "MODE",
                "REFERENCE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#open-FILEHANDLE,EXPR",
            "arguments": [
                "FILEHANDLE",
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#open-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        }
    ],
    "opendir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#opendir-DIRHANDLE,EXPR",
            "arguments": [
                "DIRHANDLE",
                "EXPR"
            ]
        }
    ],
    "ord": [
        {
            "link": "https://metacpan.org/pod/perlfunc#ord-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#ord1",
            "arguments": []
        }
    ],
    "our": [
        {
            "link": "https://metacpan.org/pod/perlfunc#our-VARLIST",
            "arguments": [
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#our-TYPE-VARLIST",
            "arguments": [
                "TYPE",
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#our-VARLIST-:-ATTRS",
            "arguments": [
                "VARLIST",
                ":",
                "ATTRS"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#our-TYPE-VARLIST-:-ATTRS",
            "arguments": [
                "TYPE",
                "VARLIST",
                ":",
                "ATTRS"
            ]
        }
    ],
    "pack": [
        {
            "link": "https://metacpan.org/pod/perlfunc#pack-TEMPLATE,LIST",
            "arguments": [
                "TEMPLATE",
                "LIST"
            ]
        }
    ],
    "package": [
        {
            "link": "https://metacpan.org/pod/perlfunc#package-NAMESPACE",
            "arguments": [
                "NAMESPACE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#package-NAMESPACE-VERSION",
            "arguments": [
                "NAMESPACE",
                "VERSION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#package-NAMESPACE-BLOCK",
            "arguments": [
                "NAMESPACE",
                "BLOCK"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#package-NAMESPACE-VERSION-BLOCK",
            "arguments": [
                "NAMESPACE",
                "VERSION",
                "BLOCK"
            ]
        }
    ],
    "pipe": [
        {
            "link": "https://metacpan.org/pod/perlfunc#pipe-READHANDLE,WRITEHANDLE",
            "arguments": [
                "READHANDLE",
                "WRITEHANDLE"
            ]
        }
    ],
    "pop": [
        {
            "link": "https://metacpan.org/pod/perlfunc#pop-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#pop1",
            "arguments": []
        }
    ],
    "pos": [
        {
            "link": "https://metacpan.org/pod/perlfunc#pos-SCALAR",
            "arguments": [
                "SCALAR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#pos1",
            "arguments": []
        }
    ],
    "print": [
        {
            "link": "https://metacpan.org/pod/perlfunc#print-FILEHANDLE-LIST",
            "arguments": [
                "FILEHANDLE",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#print-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#print-LIST",
            "arguments": [
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#print3",
            "arguments": []
        }
    ],
    "printf": [
        {
            "link": "https://metacpan.org/pod/perlfunc#printf-FILEHANDLE-FORMAT,-LIST",
            "arguments": [
                "FILEHANDLE",
                "FORMAT",
                "",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#printf-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#printf-FORMAT,-LIST",
            "arguments": [
                "FORMAT",
                "",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#printf3",
            "arguments": []
        }
    ],
    "prototype": [
        {
            "link": "https://metacpan.org/pod/perlfunc#prototype-FUNCTION",
            "arguments": [
                "FUNCTION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#prototype1",
            "arguments": []
        }
    ],
    "push": [
        {
            "link": "https://metacpan.org/pod/perlfunc#push-ARRAY,LIST",
            "arguments": [
                "ARRAY",
                "LIST"
            ]
        }
    ],
    "quotemeta": [
        {
            "link": "https://metacpan.org/pod/perlfunc#quotemeta-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#quotemeta1",
            "arguments": []
        }
    ],
    "rand": [
        {
            "link": "https://metacpan.org/pod/perlfunc#rand-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#rand1",
            "arguments": []
        }
    ],
    "read": [
        {
            "link": "https://metacpan.org/pod/perlfunc#read-FILEHANDLE,SCALAR,LENGTH,OFFSET",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH",
                "OFFSET"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#read-FILEHANDLE,SCALAR,LENGTH",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH"
            ]
        }
    ],
    "readdir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#readdir-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        }
    ],
    "readline": [
        {
            "link": "https://metacpan.org/pod/perlfunc#readline-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#readline1",
            "arguments": []
        }
    ],
    "readlink": [
        {
            "link": "https://metacpan.org/pod/perlfunc#readlink-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#readlink1",
            "arguments": []
        }
    ],
    "readpipe": [
        {
            "link": "https://metacpan.org/pod/perlfunc#readpipe-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#readpipe1",
            "arguments": []
        }
    ],
    "recv": [
        {
            "link": "https://metacpan.org/pod/perlfunc#recv-SOCKET,SCALAR,LENGTH,FLAGS",
            "arguments": [
                "SOCKET",
                "SCALAR",
                "LENGTH",
                "FLAGS"
            ]
        }
    ],
    "redo": [
        {
            "link": "https://metacpan.org/pod/perlfunc#redo-LABEL",
            "arguments": [
                "LABEL"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#redo-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#redo2",
            "arguments": []
        }
    ],
    "ref": [
        {
            "link": "https://metacpan.org/pod/perlfunc#ref-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#ref1",
            "arguments": []
        }
    ],
    "rename": [
        {
            "link": "https://metacpan.org/pod/perlfunc#rename-OLDNAME,NEWNAME",
            "arguments": [
                "OLDNAME",
                "NEWNAME"
            ]
        }
    ],
    "require": [
        {
            "link": "https://metacpan.org/pod/perlfunc#require-VERSION",
            "arguments": [
                "VERSION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#require-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#require2",
            "arguments": []
        }
    ],
    "reset": [
        {
            "link": "https://metacpan.org/pod/perlfunc#reset-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#reset1",
            "arguments": []
        }
    ],
    "return": [
        {
            "link": "https://metacpan.org/pod/perlfunc#return-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#return1",
            "arguments": []
        }
    ],
    "reverse": [
        {
            "link": "https://metacpan.org/pod/perlfunc#reverse-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "rewinddir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#rewinddir-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        }
    ],
    "rindex": [
        {
            "link": "https://metacpan.org/pod/perlfunc#rindex-STR,SUBSTR,POSITION",
            "arguments": [
                "STR",
                "SUBSTR",
                "POSITION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#rindex-STR,SUBSTR",
            "arguments": [
                "STR",
                "SUBSTR"
            ]
        }
    ],
    "rmdir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#rmdir-FILENAME",
            "arguments": [
                "FILENAME"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#rmdir1",
            "arguments": []
        }
    ],
    "say": [
        {
            "link": "https://metacpan.org/pod/perlfunc#say-FILEHANDLE-LIST",
            "arguments": [
                "FILEHANDLE",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#say-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#say-LIST",
            "arguments": [
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#say3",
            "arguments": []
        }
    ],
    "scalar": [
        {
            "link": "https://metacpan.org/pod/perlfunc#scalar-EXPR",
            "arguments": [
                "EXPR"
            ]
        }
    ],
    "seek": [
        {
            "link": "https://metacpan.org/pod/perlfunc#seek-FILEHANDLE,POSITION,WHENCE",
            "arguments": [
                "FILEHANDLE",
                "POSITION",
                "WHENCE"
            ]
        }
    ],
    "seekdir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#seekdir-DIRHANDLE,POS",
            "arguments": [
                "DIRHANDLE",
                "POS"
            ]
        }
    ],
    "select": [
        {
            "link": "https://metacpan.org/pod/perlfunc#select-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#select1",
            "arguments": []
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#select-RBITS,WBITS,EBITS,TIMEOUT",
            "arguments": [
                "RBITS",
                "WBITS",
                "EBITS",
                "TIMEOUT"
            ]
        }
    ],
    "semctl": [
        {
            "link": "https://metacpan.org/pod/perlfunc#semctl-ID,SEMNUM,CMD,ARG",
            "arguments": [
                "ID",
                "SEMNUM",
                "CMD",
                "ARG"
            ]
        }
    ],
    "semget": [
        {
            "link": "https://metacpan.org/pod/perlfunc#semget-KEY,NSEMS,FLAGS",
            "arguments": [
                "KEY",
                "NSEMS",
                "FLAGS"
            ]
        }
    ],
    "semop": [
        {
            "link": "https://metacpan.org/pod/perlfunc#semop-KEY,OPSTRING",
            "arguments": [
                "KEY",
                "OPSTRING"
            ]
        }
    ],
    "send": [
        {
            "link": "https://metacpan.org/pod/perlfunc#send-SOCKET,MSG,FLAGS,TO",
            "arguments": [
                "SOCKET",
                "MSG",
                "FLAGS",
                "TO"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#send-SOCKET,MSG,FLAGS",
            "arguments": [
                "SOCKET",
                "MSG",
                "FLAGS"
            ]
        }
    ],
    "setpgrp": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setpgrp-PID,PGRP",
            "arguments": [
                "PID",
                "PGRP"
            ]
        }
    ],
    "setpriority": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setpriority-WHICH,WHO,PRIORITY",
            "arguments": [
                "WHICH",
                "WHO",
                "PRIORITY"
            ]
        }
    ],
    "setsockopt": [
        {
            "link": "https://metacpan.org/pod/perlfunc#setsockopt-SOCKET,LEVEL,OPTNAME,OPTVAL",
            "arguments": [
                "SOCKET",
                "LEVEL",
                "OPTNAME",
                "OPTVAL"
            ]
        }
    ],
    "shift": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shift-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#shift1",
            "arguments": []
        }
    ],
    "shmctl": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shmctl-ID,CMD,ARG",
            "arguments": [
                "ID",
                "CMD",
                "ARG"
            ]
        }
    ],
    "shmget": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shmget-KEY,SIZE,FLAGS",
            "arguments": [
                "KEY",
                "SIZE",
                "FLAGS"
            ]
        }
    ],
    "shmread": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shmread-ID,VAR,POS,SIZE",
            "arguments": [
                "ID",
                "VAR",
                "POS",
                "SIZE"
            ]
        }
    ],
    "shmwrite": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shmwrite-ID,STRING,POS,SIZE",
            "arguments": [
                "ID",
                "STRING",
                "POS",
                "SIZE"
            ]
        }
    ],
    "shutdown": [
        {
            "link": "https://metacpan.org/pod/perlfunc#shutdown-SOCKET,HOW",
            "arguments": [
                "SOCKET",
                "HOW"
            ]
        }
    ],
    "sin": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sin-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sin1",
            "arguments": []
        }
    ],
    "sleep": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sleep-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sleep1",
            "arguments": []
        }
    ],
    "socket": [
        {
            "link": "https://metacpan.org/pod/perlfunc#socket-SOCKET,DOMAIN,TYPE,PROTOCOL",
            "arguments": [
                "SOCKET",
                "DOMAIN",
                "TYPE",
                "PROTOCOL"
            ]
        }
    ],
    "socketpair": [
        {
            "link": "https://metacpan.org/pod/perlfunc#socketpair-SOCKET1,SOCKET2,DOMAIN,TYPE,PROTOCOL",
            "arguments": [
                "SOCKET1",
                "SOCKET2",
                "DOMAIN",
                "TYPE",
                "PROTOCOL"
            ]
        }
    ],
    "sort": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sort-SUBNAME-LIST",
            "arguments": [
                "SUBNAME",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sort-BLOCK-LIST",
            "arguments": [
                "BLOCK",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sort-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "splice": [
        {
            "link": "https://metacpan.org/pod/perlfunc#splice-ARRAY,OFFSET,LENGTH,LIST",
            "arguments": [
                "ARRAY",
                "OFFSET",
                "LENGTH",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#splice-ARRAY,OFFSET,LENGTH",
            "arguments": [
                "ARRAY",
                "OFFSET",
                "LENGTH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#splice-ARRAY,OFFSET",
            "arguments": [
                "ARRAY",
                "OFFSET"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#splice-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        }
    ],
    "split": [
        {
            "link": "https://metacpan.org/pod/perlfunc#split-/PATTERN/,EXPR,LIMIT",
            "arguments": [
                "/PATTERN/",
                "EXPR",
                "LIMIT"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#split-/PATTERN/,EXPR",
            "arguments": [
                "/PATTERN/",
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#split-/PATTERN/",
            "arguments": [
                "/PATTERN/"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#split3",
            "arguments": []
        }
    ],
    "sprintf": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sprintf-FORMAT,-LIST",
            "arguments": [
                "FORMAT",
                "",
                "LIST"
            ]
        }
    ],
    "sqrt": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sqrt-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sqrt1",
            "arguments": []
        }
    ],
    "srand": [
        {
            "link": "https://metacpan.org/pod/perlfunc#srand-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#srand1",
            "arguments": []
        }
    ],
    "stat": [
        {
            "link": "https://metacpan.org/pod/perlfunc#stat-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#stat-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#stat-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#stat3",
            "arguments": []
        }
    ],
    "state": [
        {
            "link": "https://metacpan.org/pod/perlfunc#state-VARLIST",
            "arguments": [
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#state-TYPE-VARLIST",
            "arguments": [
                "TYPE",
                "VARLIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#state-VARLIST-:-ATTRS",
            "arguments": [
                "VARLIST",
                ":",
                "ATTRS"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#state-TYPE-VARLIST-:-ATTRS",
            "arguments": [
                "TYPE",
                "VARLIST",
                ":",
                "ATTRS"
            ]
        }
    ],
    "study": [
        {
            "link": "https://metacpan.org/pod/perlfunc#study-SCALAR",
            "arguments": [
                "SCALAR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#study1",
            "arguments": []
        }
    ],
    "substr": [
        {
            "link": "https://metacpan.org/pod/perlfunc#substr-EXPR,OFFSET,LENGTH,REPLACEMENT",
            "arguments": [
                "EXPR",
                "OFFSET",
                "LENGTH",
                "REPLACEMENT"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#substr-EXPR,OFFSET,LENGTH",
            "arguments": [
                "EXPR",
                "OFFSET",
                "LENGTH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#substr-EXPR,OFFSET",
            "arguments": [
                "EXPR",
                "OFFSET"
            ]
        }
    ],
    "symlink": [
        {
            "link": "https://metacpan.org/pod/perlfunc#symlink-OLDFILE,NEWFILE",
            "arguments": [
                "OLDFILE",
                "NEWFILE"
            ]
        }
    ],
    "syscall": [
        {
            "link": "https://metacpan.org/pod/perlfunc#syscall-NUMBER,-LIST",
            "arguments": [
                "NUMBER",
                "",
                "LIST"
            ]
        }
    ],
    "sysopen": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sysopen-FILEHANDLE,FILENAME,MODE",
            "arguments": [
                "FILEHANDLE",
                "FILENAME",
                "MODE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sysopen-FILEHANDLE,FILENAME,MODE,PERMS",
            "arguments": [
                "FILEHANDLE",
                "FILENAME",
                "MODE",
                "PERMS"
            ]
        }
    ],
    "sysread": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sysread-FILEHANDLE,SCALAR,LENGTH,OFFSET",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH",
                "OFFSET"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#sysread-FILEHANDLE,SCALAR,LENGTH",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH"
            ]
        }
    ],
    "sysseek": [
        {
            "link": "https://metacpan.org/pod/perlfunc#sysseek-FILEHANDLE,POSITION,WHENCE",
            "arguments": [
                "FILEHANDLE",
                "POSITION",
                "WHENCE"
            ]
        }
    ],
    "system": [
        {
            "link": "https://metacpan.org/pod/perlfunc#system-LIST",
            "arguments": [
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#system-PROGRAM-LIST",
            "arguments": [
                "PROGRAM",
                "LIST"
            ]
        }
    ],
    "syswrite": [
        {
            "link": "https://metacpan.org/pod/perlfunc#syswrite-FILEHANDLE,SCALAR,LENGTH,OFFSET",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH",
                "OFFSET"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#syswrite-FILEHANDLE,SCALAR,LENGTH",
            "arguments": [
                "FILEHANDLE",
                "SCALAR",
                "LENGTH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#syswrite-FILEHANDLE,SCALAR",
            "arguments": [
                "FILEHANDLE",
                "SCALAR"
            ]
        }
    ],
    "tell": [
        {
            "link": "https://metacpan.org/pod/perlfunc#tell-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#tell1",
            "arguments": []
        }
    ],
    "telldir": [
        {
            "link": "https://metacpan.org/pod/perlfunc#telldir-DIRHANDLE",
            "arguments": [
                "DIRHANDLE"
            ]
        }
    ],
    "tie": [
        {
            "link": "https://metacpan.org/pod/perlfunc#tie-VARIABLE,CLASSNAME,LIST",
            "arguments": [
                "VARIABLE",
                "CLASSNAME",
                "LIST"
            ]
        }
    ],
    "tied": [
        {
            "link": "https://metacpan.org/pod/perlfunc#tied-VARIABLE",
            "arguments": [
                "VARIABLE"
            ]
        }
    ],
    "time": [
        {
            "link": "https://metacpan.org/pod/perlfunc#time",
            "arguments": []
        }
    ],
    "times": [
        {
            "link": "https://metacpan.org/pod/perlfunc#times",
            "arguments": []
        }
    ],
    "truncate": [
        {
            "link": "https://metacpan.org/pod/perlfunc#truncate-FILEHANDLE,LENGTH",
            "arguments": [
                "FILEHANDLE",
                "LENGTH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#truncate-EXPR,LENGTH",
            "arguments": [
                "EXPR",
                "LENGTH"
            ]
        }
    ],
    "uc": [
        {
            "link": "https://metacpan.org/pod/perlfunc#uc-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#uc1",
            "arguments": []
        }
    ],
    "ucfirst": [
        {
            "link": "https://metacpan.org/pod/perlfunc#ucfirst-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#ucfirst1",
            "arguments": []
        }
    ],
    "umask": [
        {
            "link": "https://metacpan.org/pod/perlfunc#umask-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#umask1",
            "arguments": []
        }
    ],
    "undef": [
        {
            "link": "https://metacpan.org/pod/perlfunc#undef-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#undef1",
            "arguments": []
        }
    ],
    "unlink": [
        {
            "link": "https://metacpan.org/pod/perlfunc#unlink-LIST",
            "arguments": [
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#unlink1",
            "arguments": []
        }
    ],
    "unpack": [
        {
            "link": "https://metacpan.org/pod/perlfunc#unpack-TEMPLATE,EXPR",
            "arguments": [
                "TEMPLATE",
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#unpack-TEMPLATE",
            "arguments": [
                "TEMPLATE"
            ]
        }
    ],
    "unshift": [
        {
            "link": "https://metacpan.org/pod/perlfunc#unshift-ARRAY,LIST",
            "arguments": [
                "ARRAY",
                "LIST"
            ]
        }
    ],
    "untie": [
        {
            "link": "https://metacpan.org/pod/perlfunc#untie-VARIABLE",
            "arguments": [
                "VARIABLE"
            ]
        }
    ],
    "use": [
        {
            "link": "https://metacpan.org/pod/perlfunc#use-Module-VERSION-LIST",
            "arguments": [
                "Module",
                "VERSION",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#use-Module-VERSION",
            "arguments": [
                "Module",
                "VERSION"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#use-Module-LIST",
            "arguments": [
                "Module",
                "LIST"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#use-Module",
            "arguments": [
                "Module"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#use-VERSION",
            "arguments": [
                "VERSION"
            ]
        }
    ],
    "utime": [
        {
            "link": "https://metacpan.org/pod/perlfunc#utime-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "values": [
        {
            "link": "https://metacpan.org/pod/perlfunc#values-HASH",
            "arguments": [
                "HASH"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#values-ARRAY",
            "arguments": [
                "ARRAY"
            ]
        }
    ],
    "vec": [
        {
            "link": "https://metacpan.org/pod/perlfunc#vec-EXPR,OFFSET,BITS",
            "arguments": [
                "EXPR",
                "OFFSET",
                "BITS"
            ]
        }
    ],
    "wait": [
        {
            "link": "https://metacpan.org/pod/perlfunc#wait",
            "arguments": []
        }
    ],
    "waitpid": [
        {
            "link": "https://metacpan.org/pod/perlfunc#waitpid-PID,FLAGS",
            "arguments": [
                "PID",
                "FLAGS"
            ]
        }
    ],
    "wantarray": [
        {
            "link": "https://metacpan.org/pod/perlfunc#wantarray",
            "arguments": []
        }
    ],
    "warn": [
        {
            "link": "https://metacpan.org/pod/perlfunc#warn-LIST",
            "arguments": [
                "LIST"
            ]
        }
    ],
    "write": [
        {
            "link": "https://metacpan.org/pod/perlfunc#write-FILEHANDLE",
            "arguments": [
                "FILEHANDLE"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#write-EXPR",
            "arguments": [
                "EXPR"
            ]
        },
        {
            "link": "https://metacpan.org/pod/perlfunc#write2",
            "arguments": []
        }
    ]
};
