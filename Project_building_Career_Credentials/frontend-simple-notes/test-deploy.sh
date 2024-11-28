
npm run build
rm -rf ../backend-simple-notes/public
mkdir ../backend-simple-notes/public
cp -r ./dist/* ../backend-simple-notes/public/

echo "Copied files to ../backend-simple-notes/public/"

