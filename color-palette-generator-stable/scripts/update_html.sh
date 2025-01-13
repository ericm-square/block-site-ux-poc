#!/bin/bash

cd "$(dirname "$0")"

# Create a backup of the original HTML file
cp index.html index.html.backup

# Replace each Unsplash URL with the corresponding local path
while IFS= read -r url; do
    image_id=$(echo "$url" | awk -F'/' '{print $NF}')
    sed -i '' "s|${url}|images/${image_id}.jpg|g" index.html
done < unsplash_urls.txt

echo "HTML file updated with local image paths!"