#!/bin/bash

cd "$(dirname "$0")"
mkdir -p images

# Download and optimize each image
while IFS= read -r url; do
    # Extract the image ID from the URL
    image_id=$(echo "$url" | awk -F'/' '{print $NF}')
    
    # Download the image with a good size
    echo "Downloading $image_id..."
    curl -L "${url}?w=800&q=80" -o "images/${image_id}.jpg"
    
    # Optimize the image
    echo "Optimizing ${image_id}.jpg..."
    /opt/homebrew/bin/convert "images/${image_id}.jpg" -strip -quality 80 -resize '800x800>' "images/${image_id}_optimized.jpg"
    mv "images/${image_id}_optimized.jpg" "images/${image_id}.jpg"
done < unsplash_urls.txt

echo "All images downloaded and optimized!"