#!/usr/bin/env bash

# add to a json file to be imported and added to drop down.

INDEX_PATH="../src/index.json"

cat <<- EOF > ${INDEX_PATH}
{
    "files": [
    ]
}
EOF
OUTPUT_PATH="../static/cells"


TEMPFILE=$(mktemp)

while IFS=, read -r _filename
do
    _no_extension="${_filename%.*}"
    echo "File ${_filename} exists as ${_no_extension}"

    jq --arg filename "${_no_extension}" '.files += [$filename]' ${INDEX_PATH} > $TEMPFILE
    cp $TEMPFILE ${INDEX_PATH}
done < <(ls ${OUTPUT_PATH})

rm $TEMPFILE