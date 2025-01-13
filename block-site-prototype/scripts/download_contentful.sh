#!/bin/bash

cd "$(dirname "$0")"
mkdir -p images

# Download and optimize the Contentful image
IMAGE_URL="https://images.ctfassets.net/2d5q1td6cyxq/1DeN637m09fU5hUY8XkS9u/cdcbe9cac7a573ff14bbfb3dd9711259/PD03317_-_XL_USEN_table_layout_image_break.png"
IMAGE_NAME="table_layout_break.png"

echo "Downloading ${IMAGE_NAME}..."
curl -L "${IMAGE_URL}?w=1200&q=80" -o "images/${IMAGE_NAME}"

echo "Optimizing ${IMAGE_NAME}..."
/opt/homebrew/bin/convert "images/${IMAGE_NAME}" -strip -quality 80 -resize '1200x>' "images/${IMAGE_NAME}_optimized.png"
mv "images/${IMAGE_NAME}_optimized.png" "images/${IMAGE_NAME}"

echo "Image downloaded and optimized!"

# Update the HTML file to use the local image
sed -i '' "s|${IMAGE_URL}?[^\"]*|images/${IMAGE_NAME}|g" index.html

echo "HTML file updated with local image path!"