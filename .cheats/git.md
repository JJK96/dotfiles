# Git
% git

## Show differences with upstream
```
git log <upstream>/<master>..<master> --oneline --graph --decorate --abbrev-commit
```

## Clone only a specific directory
```
git clone --filter=blob:none --sparse <repo>
git sparse-checkout add <dir>
```

## Merge specific folder
```
git log <current>..<source> --pretty=format:"%h" --no-merges --reverse -- <folder> | xargs git cherry-pick
```

= upstream: upstream
= master: master
= folder: .
