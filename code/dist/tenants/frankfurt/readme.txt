Batch:
for i in *.png ; do convert "$i" -gravity SouthEast -background white -extent 1280x720 "${i%.*}.png" ; done

Single
convert input.png -gravity SouthEast -background white -extent 1280x720  output.jpg

rsync -avz code/dist/tenants/frankfurt/pictures/img/frankfurt sharepic://var/www/sharepicgenerator.de/shared/tenants/frankfurt/pictures/img/
