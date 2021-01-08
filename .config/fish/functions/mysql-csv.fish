function mysql-csv
     mysql $argv | sed -e 's/\t/,/g'
end
