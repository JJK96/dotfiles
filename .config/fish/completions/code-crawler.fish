complete -c code-crawler -f -a "(find ~/git/code-crawler -name '*.config' -exec basename {} \; | sed 's/\..*//')"
