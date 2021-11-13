#!/usr/bin/env bash

#TEMPFILE=$(mktemp)
OUTPUT_PATH="../static/cells"

mkdir -p "${OUTPUT_PATH}"

USERNAME=chrisguest75
echo "!Name: contribution graph" > "${OUTPUT_PATH}/!${USERNAME}_contributions.cells"

# extract the cell file paths.
while IFS=, read -r _line
do
    IFS=',' read -ra _values <<< "$_line"
    outline=""
    for _i in "${_values[@]}"; do
        _n="$(($_i + 0))"
        if [[ $_n == 0 ]]; then
            outline="${outline}."
        else
            outline="${outline}O"
        fi
    done
    echo "${outline}" >> "${OUTPUT_PATH}/!${USERNAME}_contributions.cells"


done < <(curl "https://github-contributions-api.deno.dev/${USERNAME}.text?no-legend=true&no-total=true")


