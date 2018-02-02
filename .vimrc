set nocompatible 
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'
Plugin 'solarized'
Plugin 'vim-scripts/Align'
Plugin 'tpope/vim-dispatch'
Plugin 'vim-latex/vim-latex'
Plugin 'skywind3000/asyncrun.vim'
Plugin 'dylanaraps/wal.vim'
"Plugin 'davidhalter/jedi-vim'
"Plugin 'guyzmo/vim-etherpad'
call vundle#end()
if &cp | set nocp | endif
set background=dark
colorscheme solarized
let g:solarized_termtrans=1
set backspace=indent,eol,start
set number
set fileencodings=ucs-bom,utf-8,default,latin1
set helplang=en
set ruler
set suffixes=.bak,~,.swp,.o,.info,.aux,.log,.dvi,.bbl,.blg,.brf,.cb,.ind,.idx,.ilg,.inx,.out,.toc,.png,.jpg
set showcmd
filetype plugin indent on
syntax on
set relativenumber
vnoremap . :normal .<CR>
map [[ ?{<CR>w99[{
map ][ /}<CR>b99]}
map ]] j0[[%/{<CR>
map [] k$][%?}<CR>
set mouse=a
let g:tex_flavor = 'latex'
set omnifunc=syntaxcomplete#Complete
set autoread
set softtabstop=4
set autoindent
set shiftwidth=4
set expandtab
set hidden
inoremap <C-h> <home>
inoremap <C-l> <end>
inoremap <C-w> <C-right>
inoremap <C-b> <C-left>
noremap H ^
noremap L $
nnoremap U <C-r>
set scrolloff=10
nnoremap <C-k> :bprev<CR>
augroup vimrc
    au!
    au VimEnter * unmap <C-j>
    au VimEnter * nnoremap <C-j> :bnext<CR>
augroup END
vmap <C-c> "+y
nmap Y y$
nmap M :w<CR>:@c<CR>
let g:epad_host = "pad.noedel.win" " Hostname to connect to
let g:epad_port = "9001"      " Port to connect to
let g:epad_path = "p/"        " URL Path to the pad
