#!/bin/bash

# Check if a directory argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

# Directory to read files from (provided as argument)
directory="$1"

# Check if the provided directory exists
if [ ! -d "$directory" ]; then
  echo "Error: Directory $directory does not exist."
  exit 1
fi

# Use find to list all files recursively, excluding node_modules and .env directories, and output their paths
A=( `find "$directory" -type f -not -path "*/node_modules/*" -not -path "*/.env/*" -not -path "*/.git/*" -not -path "*/dump.rdb" -not -path "*/package-lock.json" -not -path "*/.next/*" -not -path "*/prisma/migrations/*" -not -path "*/*.png" -exec realpath {} \;` )

for n in ${A[@]};
do
    echo $n
    echo `cat $n`
done
