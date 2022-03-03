set fish_function_path $fish_function_path ~/.config/fish/plugin-foreign-env/functions

fenv source ~/.profile
source ~/.config/fish/keybinds.fish
source ~/.config/fish/git.fish
source ~/.config/fish/aliases.fish
source ~/.config/fish/java.fish
source ~/.config/fish/nnn.fish
source ~/nw_bin/create_customer_env.fish

set fish_greeting
set -g fish_prompt_pwd_dir_length 80
set -x LSCOLORS "ExGxBxDxCxEgEdxbxgxcxd"
set -x NODE_PATH "/usr/local/lib/node_modules:$NODE_PATH"
