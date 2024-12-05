clear

VERSION = $1

echo VERSION

git add .
git commit -m $1
git push