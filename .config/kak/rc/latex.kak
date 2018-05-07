# latex

# Compile the first main.tex found
hook global BufWritePost .*\.tex %{ nop %sh{ (
    path=$(pwd)
    function _find() {
    	file="$(find "$path" -maxdepth 1 -mindepth 1 -name main.tex)"
	}
	# _find
	while ! [ $file ];
	do
		_find
	    path="$(readlink -f "$path"/..)"
    done
    cd ${file%main.tex}
    pdflatex --enable-write18 main.tex && \
    bibtex main && \
    pdflatex --enable-write18 main.tex && \
    pdflatex --enable-write18 main.tex && \
    pkill -HUP mupdf
) > /tmp/tex.log 2>&1 < /dev/null &}}
