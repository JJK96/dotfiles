abbr gs 'git status'
abbr gd 'git diff'
abbr gc 'git commit'
abbr gl 'git pull'
abbr ga 'git add'
abbr gaa 'git add --all'
abbr gm 'git merge'
abbr glum 'git pull upstream master'
abbr gp 'git push'
abbr gco 'git checkout'
abbr gcm 'git checkout master'
abbr grs 'git restore'
abbr grb 'git rebase'

alias gcf 'git commit -m "`fortune`"'
alias gpf "git add -A ; and gcf && git pull && git push"
alias gpatch "git format-patch -o /tmp origin"

alias gwip 'git add -A; git ls-files --deleted -z | xargs -0 git rm; git commit -m "wip"'
alias gunwip 'git log -n 1 | grep -q -c wip; and git reset HEAD~1'
