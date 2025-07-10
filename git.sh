# Oldv
ver="0.0.0.0"

# Read old version
if [ -f ".version" ]; then ver=$(head -n 1 .version); fi

# Set vars
i=0
for element in $(echo $ver | tr "." "\n"); do
  case $i in
    0) v0=$element;;
    1) v1=$element;;
    2) v2=$element;;
    3) v3=$element;;
  esac

  i=$((i+1))
done

# Increase version
case $1 in
  0) v0=$((v0+1)) && v1=0 && v2=0 && v3=0;;
  1) v1=$((v1+1)) && v2=0 && v3=0;;
  2) v2=$((v2+1)) && v3=0;;
  *) v3=$((v3+1));;
esac

# Set new version
ver=$v0.$v1.$v2.$v3

# Update version file
echo $ver > .version

# Git
git add .
git commit -m $ver
git push

clear