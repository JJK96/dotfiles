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
Plugin 'digitaltoad/vim-pug'
"Plugin 'bling/vim-bufferline'
Plugin 'ternjs/tern_for_vim'
Plugin 'Valloric/YouCompleteMe'
"Plugin 'davidhalter/jedi-vim'
"Plugin 'guyzmo/vim-etherpad'
call vundle#end()
if &cp | set nocp | endif
set background=dark
colorscheme solarized
let g:solarized_termtrans=1
set backspace=indent,eol,start
set fileencodings=ucs-bom,utf-8,default,latin1
set helplang=en
set ruler
set suffixes=.bak,~,.swp,.o,.info,.aux,.log,.dvi,.bbl,.blg,.brf,.cb,.ind,.idx,.ilg,.inx,.out,.toc,.png,.jpg
set showcmd
filetype plugin indent on
syntax on
"set omnifunc=syntaxcomplete#Complete
set relativenumber
vnoremap . :normal .<CR>
map [[ ?}<CR>%^
map ]] /{<CR>%
set mouse=a
let g:tex_flavor = 'latex'
set autoread
set softtabstop=4
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
nnoremap <C-l> :tabn<CR>
nnoremap <C-h> :tabp<CR>
vmap <C-c> "+y
nmap Y y$
"execute command in buffer c
nmap M :w<CR>:@c<CR>
"twig file type
au BufRead,BufNewFile *.twig set ft=html
"remove header in folder view
set wildmenu
" remove banner in folder view
let g:netrw_banner = 0
" display folder in tree
let g:netrw_liststyle=3
" open tab when opening file from folder
let g:netrw_browse_split=3
let g:tern_show_argument_hints='on_hold'
cabbrev e tabe
function! CloseSomething()
  if winnr("$") == 1 && tabpagenr("$") > 1 && tabpagenr() > 1 && tabpagenr() < tabpagenr("$")
    tabclose | tabprev
  else
    q
  endif
endfunction
map <C-x> :call CloseSomething()<CR>
