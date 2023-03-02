/*
https://github.com/cristianku/mpcnc_posts_processor

originally from : https://github.com/guffy1234/mpcnc_posts_processor

MPCNC posts processor for milling and laser/plasma cutting. Klipper VERSION


*/
include("Klipper.js");

description = "MPCNC KLIPPER Milling/Laser ";

//mergeProperties(properties, properties3dPrinter);
//mergeProperties(propertyDefinitions, propertyDefinitions3dPrinter);

function FirmwareKLIPPER() {
    Firmware3dPrinterLike.apply(this, arguments);
}
FirmwareKLIPPER.prototype = Object.create(Firmware3dPrinterLike.prototype);
FirmwareKLIPPER.prototype.constructor = FirmwareKLIPPER;

currentFirmware = new FirmwareKLIPPER();


