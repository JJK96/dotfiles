"nmap s :w<cr>:!pandoc -t html -s -o /tmp/output.html --css $HOME/.config/pandoc/pandoc.css %<cr>
nmap s :w<cr>:AsyncRun pandoc -o /tmp/output.pdf %<cr>
