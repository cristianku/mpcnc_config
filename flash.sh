sudo service klipper stop
git ~/klipper
git pull
make clean
make
make flash FLASH_DEVICE=/dev/serial/by-id/usb-Klipper_lpc1769_2240001780A037AFC8E4BF5BC22000F5-if00
sudo service klipper start
