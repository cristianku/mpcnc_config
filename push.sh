cd ~/printer_data/config
cp ~/push.sh .
cp ~/klipper/.config menuconfig_configs/klipper.config
cp ~/klipper/flash.sh flash.sh
git add .
git commit -m"aaa"
git push
