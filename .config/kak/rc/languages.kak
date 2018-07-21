hook global WinSetOption filetype=(html) %[
    define-command emmet %{
        execute-keys ";<a-?>\h+|^<ret>|%val{config}/bin/emmet-call<ret>"
    }
    map buffer insert <c-e> <esc>:emmet<ret>
]

hook global WinSetOption filetype=(xml) %[
    set-option buffer formatcmd %{xmllint --format -}
]

hook global WinSetOption filetype=(json) %[
    set-option buffer formatcmd %{python -m json.tool}
]

