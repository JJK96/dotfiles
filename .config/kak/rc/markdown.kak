# compile markdown in background on save.
hook global BufWritePost .*\.md %{ nop %sh{ ( pandoc -o /tmp/output.pdf $kak_buffile ) > /dev/null 2>&1 < /dev/null &}}

