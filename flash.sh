sudo service klipper stop
cd ~/klipper
git pull
make clean
make
./scripts/flash-sdcard.sh /dev/serial/by-id/usb-Klipper_lpc1769_2240001780A037AFC8E4BF5BC22000F5-if00 btt-skr-turbo-v1.4
sudo service klipper start

