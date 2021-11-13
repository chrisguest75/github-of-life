#!/usr/bin/env bash

#TEMPFILE=$(mktemp)
OUTPUT_PATH="../static/cells"

mkdir -p "${OUTPUT_PATH}"
curl -o ./patterns.html https://www.conwaylife.com/patterns/  

# extract the cell file paths.
cat ./patterns.html | ggrep -Po 'href="\K.*?(?=")' | grep ".*\.cells" > ./files.txt

while IFS=, read -r _filename
do
    # download or not
    if [[ -f "${OUTPUT_PATH}/${_filename}" ]]; then
        echo "File ${_filename} exists"
    else
        echo "Downloading ${_filename}"
        curl -s -o "${OUTPUT_PATH}/${_filename}" "https://www.conwaylife.com/patterns/${_filename}"
    fi
done < ./files.txt

# add to a json file to be imported and added to drop down.

