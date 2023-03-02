/*
Original post processor : https://github.com/guffy1234/mpcnc_posts_processor

This is a modified and simplified version for Klipper - MPCNC posts processor for milling and laser/plasma cutting.

*/


// user-defined properties
properties = {
  jobTravelSpeedXY: 1500,              // High speed for travel movements X & Y (mm/min)
  jobTravelSpeedZ: 300,                // High speed for travel movements Z (mm/min)

  jobManualSpindlePowerControl: true,   // Spindle motor is controlled by manual switch

  jobSequenceNumbers: false,           // show sequence numbers
  jobSequenceNumberStart: 10,          // first sequence number
  jobSequenceNumberIncrement: 1,       // increment for sequence numbers
  //jobSeparateWordsWithSpace: true,     // specifies that the words should be separated with a white space
//  jobSetOriginOnStart: true,           // Set origin when gcode start (G92)


  cutterOnVaporize: 100,            // Persent of power to turn on the laser/plasma cutter in vaporize mode
  cutterOnThrough: 80,              // Persent of power to turn on the laser/plasma cutter in through mode
  cutterOnEtch: 40,                 // Persent of power to turn on the laser/plasma cutter in etch mode

  coolantA_Mode: 0, // Enable issuing g-codes for control Coolant channel A
  coolantB_Mode: 0, // Use issuing g-codes for control Coolant channel B
  commentCommands: true,

  OctoUrl: "cnc.local",
  OctoApi: "8A648957CAE4428B8BCE13381554D639",
  OctoStart:false,
  OctoUpload:true,
  CurlHide:false,

};

propertyDefinitions = {
  jobFirmware: {
    title: "Job: Firmware", description: "GCode output mode", group: 1,
    type: "integer", default_mm: 0, default_in: 0,
    values: [
      { title: "Klipper", id: 0 },

    ]
  },

  OctoUrl: {title:"Octo: URL", description:"Octoprint URL", group:0, type:"string", default:"cnc.local"},
  OctoApi: {title:"Octo: API", description:"Octoprint API key", group:0, type:"string", default:"8A648957CAE4428B8BCE13381554D639"},
  OctoStart: {title:"Octo: Start print", description:"Start printing immediatelly", group:0, type:"boolean", default:false},
  OctoUpload: {title:"Octo: Upload", description:"You can disable uploading", group:0, type:"boolean", default:true},
  CurlHide: {title:"Curl: Hide", description:"Hide curl application", group:0, type:"boolean", default:false},

  jobTravelSpeedXY: {
    title: "Job: Travel speed X/Y", description: "High speed for travel movements X & Y (mm/min; in/min)", group: 1,
    type: "spatial", default_mm: 2500, default_in: 100
  },
  jobTravelSpeedZ: {
    title: "Job: Travel Speed Z", description: "High speed for travel movements z (mm/min; in/min)", group: 1,
    type: "spatial", default_mm: 300, default_in: 12
  },

  jobManualSpindlePowerControl: {
    title: "Job: Manual Spindle On/Off", description: "Set Yes when your spindle motor is controlled by manual switch", group: 1,
    type: "boolean", default_mm: true, default_in: true
  },
  // jobSetOriginOnStart: {
  //   title: "Job: Reset on start (G92)", description: "Set origin when gcode start (G92)", group: 1,
  //   type: "boolean", default_mm: true, default_in: true
  // },

  // jobMarlinEnforceFeedrate: {
  //   title: "Job: Marlin: Enforce Feedrate", description: "Add feedrate to each movement g-code", group: 1,
  //   type: "boolean", default_mm: false, default_in: false
  // },

  jobSequenceNumbers: {
    title: "Job: Line numbers", description: "Show sequence numbers", group: 1,
    type: "boolean", default_mm: true, default_in: true
  },
  jobSequenceNumberStart: {
    title: "Job: Line start", description: "First sequence number", group: 1,
    type: "integer", default_mm: 10, default_in: 10
  },
  jobSequenceNumberIncrement: {
    title: "Job: Line increment", description: "Lncrement for sequence numbers", group: 1,
    type: "integer", default_mm: 1, default_in: 1
  },

  cutterOnVaporize: {
    title: "Laser: On - Vaporize", description: "Persent of power to turn on the laser/plasma cutter in vaporize mode", group: 2,
    type: "number", default_mm: 100, default_in: 100
  },
  cutterOnThrough: {
    title: "Laser: On - Through", description: "Persent of power to turn on the laser/plasma cutter in through mode", group: 2,
    type: "number", default_mm: 80, default_in: 80
  },
  cutterOnEtch: {
    title: "Laser: On - Etch", description: "Persent of power to on the laser/plasma cutter in etch mode", group: 2,
    type: "number", default_mm: 40, default_in: 40
  },
  cutterMarlinMode: {
    title: "Laser: Marlin/Reprap mode", description: "Marlin/Reprar mode of the laser/plasma cutter", group: 2,
    type: "integer", default_mm: 106, default_in: 106,
    values: [
      { title: "M106 S{PWM}/M107", id: 106 },
      { title: "M3 O{PWM}/M5", id: 3 },
      { title: "M42 P{pin} S{PWM}", id: 42 },
    ]
  },
  cutterMarlinPin: {
    title: "Laser: Marlin M42 pin", description: "Marlin custom pin number for the laser/plasma cutter", group: 2,
    type: "integer", default_mm: 4, default_in: 4
  },
  cutterGrblMode: {
    title: "Laser: GRBL mode", description: "GRBL mode of the laser/plasma cutter", group: 2,
    type: "integer", default_mm: 4, default_in: 4,
    values: [
      { title: "M4 S{PWM}/M5 dynamic power", id: 4 },
      { title: "M3 S{PWM}/M5 static power", id: 3 },
    ]
  },

  coolantA_Mode: {
    title: "Coolant: A Mode", description: "Enable issuing g-codes for control Coolant channel A", group: 3, type: "integer",
    default_mm: 0, default_in: 0,
    values: [
      { title: "off", id: 0 },
      { title: "flood", id: 1 },
      { title: "mist", id: 2 },
      { title: "throughTool", id: 3 },
      { title: "air", id: 4 },
      { title: "airThroughTool", id: 5 },
      { title: "suction", id: 6 },
      { title: "floodMist", id: 7 },
      { title: "floodThroughTool", id: 8 }
    ]
  },
  coolantAMarlinOn: { title: "Coolant: A On command", description: "GCode command to turn on Coolant channel A", group: 3, type: "string", default_mm: "M42 P11 S255" },
  coolantAMarlinOff: {
    title: "Coolant: A Off command", description: "Gcode command to turn off Coolant A", group: 3, type: "string",
    default_mm: "M42 P11 S0", default_in: "M42 P11 S0"
  },

  coolantB_Mode: {
    title: "Coolant: B Mode", description: "Enable issuing g-codes for control Coolant channel B", group: 3, type: "integer",
    default_mm: 0, default_in: 0,
    values: [
      { title: "off", id: 0 },
      { title: "flood", id: 1 },
      { title: "mist", id: 2 },
      { title: "throughTool", id: 3 },
      { title: "air", id: 4 },
      { title: "airThroughTool", id: 5 },
      { title: "suction", id: 6 },
      { title: "floodMist", id: 7 },
      { title: "floodThroughTool", id: 8 }
    ]
  },
  coolantBMarlinOn: {
    title: "Coolant: B On command", description: "GCode command to turn on Coolant channel B", group: 3, type: "string",
    default_mm: "M42 P6 S255", default_in: "M42 P6 S255"
  },
  coolantBMarlinOff: {
    title: "Coolant: B Off command", description: "Gcode command to turn off Coolant channel B", group: 3, type: "string",
    default_mm: "M42 P6 S0", default_in: "M42 P6 S0"
  },



};

// Internal properties
certificationLevel = 2;
extension = "gcode";
setCodePage("ascii");
// capabilities = CAPABILITY_MILLING | CAPABILITY_JET;
capabilities = CAPABILITY_MILLING | CAPABILITY_MACHINE_SIMULATION; // required for machine simulation

// vendor of MPCNC
vendor = "MPCNC with klipper firmware 2.0";
vendorUrl = "https://github.com/cristianku/mpcnc_config";

var sequenceNumber;

// Formats
var gFormat = createFormat({ prefix: "G", decimals: 1 });
var mFormat = createFormat({ prefix: "M", decimals: 0 });

var xyzFormat = createFormat({ decimals: (unit == MM ? 3 : 4) });
var xFormat = createFormat({ prefix: "X", decimals: (unit == MM ? 3 : 4) });
var yFormat = createFormat({ prefix: "Y", decimals: (unit == MM ? 3 : 4) });
var zFormat = createFormat({ prefix: "Z", decimals: (unit == MM ? 3 : 4) });
var iFormat = createFormat({ prefix: "I", decimals: (unit == MM ? 3 : 4) });
var jFormat = createFormat({ prefix: "J", decimals: (unit == MM ? 3 : 4) });
var kFormat = createFormat({ prefix: "K", decimals: (unit == MM ? 3 : 4) });

var speedFormat = createFormat({ decimals: 0 });
var sFormat = createFormat({ prefix: "S", decimals: 0 });

var pFormat = createFormat({ prefix: "P", decimals: 0 });
var oFormat = createFormat({ prefix: "O", decimals: 0 });

var feedFormat = createFormat({ decimals: (unit == MM ? 0 : 2) });
var fFormat = createFormat({ prefix: "F", decimals: (unit == MM ? 0 : 2) });

var toolFormat = createFormat({ decimals: 0 });
var tFormat = createFormat({ prefix: "T", decimals: 0 });

var taperFormat = createFormat({ decimals: 1, scale: DEG });
var secFormat = createFormat({ decimals: 3, forceDecimal: true }); // seconds - range 0.001-1000

// Linear outputs
var xOutput = createVariable({}, xFormat);
var yOutput = createVariable({}, yFormat);
var zOutput = createVariable({}, zFormat);
var fOutput = createVariable({}, fFormat);
var sOutput = createVariable({ force: true }, sFormat);

// Circular outputs
var iOutput = createReferenceVariable({}, iFormat);
var jOutput = createReferenceVariable({}, jFormat);
var kOutput = createReferenceVariable({}, kFormat);

// Modals
var gMotionModal = createModal({}, gFormat); // modal group 1 // G0-G3, ...
var gPlaneModal = createModal({ onchange: function () { gMotionModal.reset(); } }, gFormat); // modal group 2 // G17-19
var gAbsIncModal = createModal({}, gFormat); // modal group 3 // G90-91
var gFeedModeModal = createModal({}, gFormat); // modal group 5 // G93-94
var gUnitModal = createModal({}, gFormat); // modal group 6 // G20-21


// Arc support variables
minimumChordLength = spatial(0.01, MM);
minimumCircularRadius = spatial(0.01, MM);
maximumCircularRadius = spatial(1000, MM);
minimumCircularSweep = toRad(0.01);
maximumCircularSweep = toRad(180);
allowHelicalMoves = false;
allowedCircularPlanes = undefined;

// Start of machine configuration logic
var compensateToolLength = false; // add the tool length to the pivot distance for nonTCP rotary heads

// internal variables, do not change
var receivedMachineConfiguration;
var operationSupportsTCP;
var multiAxisFeedrate;

function activateMachine() {
  // disable unsupported rotary axes output
  if (!machineConfiguration.isMachineCoordinate(0) && (typeof aOutput != "undefined")) {
    aOutput.disable();
  }
  if (!machineConfiguration.isMachineCoordinate(1) && (typeof bOutput != "undefined")) {
    bOutput.disable();
  }
  if (!machineConfiguration.isMachineCoordinate(2) && (typeof cOutput != "undefined")) {
    cOutput.disable();
  }

  // setup usage of multiAxisFeatures
  useMultiAxisFeatures = getProperty("useMultiAxisFeatures") != undefined ? getProperty("useMultiAxisFeatures") :
    (typeof useMultiAxisFeatures != "undefined" ? useMultiAxisFeatures : false);
  useABCPrepositioning = getProperty("useABCPrepositioning") != undefined ? getProperty("useABCPrepositioning") :
    (typeof useABCPrepositioning != "undefined" ? useABCPrepositioning : false);

  if (!machineConfiguration.isMultiAxisConfiguration()) {
    return; // don't need to modify any settings for 3-axis machines
  }

  // save multi-axis feedrate settings from machine configuration
  var mode = machineConfiguration.getMultiAxisFeedrateMode();
  var type = mode == FEED_INVERSE_TIME ? machineConfiguration.getMultiAxisFeedrateInverseTimeUnits() :
    (mode == FEED_DPM ? machineConfiguration.getMultiAxisFeedrateDPMType() : DPM_STANDARD);
  multiAxisFeedrate = {
    mode     : mode,
    maximum  : machineConfiguration.getMultiAxisFeedrateMaximum(),
    type     : type,
    tolerance: mode == FEED_DPM ? machineConfiguration.getMultiAxisFeedrateOutputTolerance() : 0,
    bpwRatio : mode == FEED_DPM ? machineConfiguration.getMultiAxisFeedrateBpwRatio() : 1
  };

  // setup of retract/reconfigure  TAG: Only needed until post kernel supports these machine config settings
  if (receivedMachineConfiguration && machineConfiguration.performRewinds()) {
    safeRetractDistance = machineConfiguration.getSafeRetractDistance();
    safePlungeFeed = machineConfiguration.getSafePlungeFeedrate();
    safeRetractFeed = machineConfiguration.getSafeRetractFeedrate();
  }
  if (typeof safeRetractDistance == "number" && getProperty("safeRetractDistance") != undefined && getProperty("safeRetractDistance") != 0) {
    safeRetractDistance = getProperty("safeRetractDistance");
  }

  if (machineConfiguration.isHeadConfiguration()) {
    compensateToolLength = typeof compensateToolLength == "undefined" ? false : compensateToolLength;
  }

  if (machineConfiguration.isHeadConfiguration() && compensateToolLength) {
    for (var i = 0; i < getNumberOfSections(); ++i) {
      var section = getSection(i);
      if (section.isMultiAxis()) {
        machineConfiguration.setToolLength(getBodyLength(section.getTool())); // define the tool length for head adjustments
        section.optimizeMachineAnglesByMachine(machineConfiguration, OPTIMIZE_AXIS);
      }
    }
  } else {
    optimizeMachineAngles2(OPTIMIZE_AXIS);
  }
}

function getBodyLength(tool) {
  for (var i = 0; i < getNumberOfSections(); ++i) {
    var section = getSection(i);
    if (tool.number == section.getTool().number) {
      return section.getParameter("operation:tool_overallLength", tool.bodyLength + tool.holderLength);
    }
  }
  return tool.bodyLength + tool.holderLength;
}

function defineMachine() {
  var useTCP = true;
  if (false) { // note: setup your machine here
    var aAxis = createAxis({coordinate:0, table:true, axis:[1, 0, 0], range:[-120, 120], preference:1, tcp:useTCP});
    var cAxis = createAxis({coordinate:2, table:true, axis:[0, 0, 1], range:[-360, 360], preference:0, tcp:useTCP});
    machineConfiguration = new MachineConfiguration(aAxis, cAxis);

    setMachineConfiguration(machineConfiguration);
    if (receivedMachineConfiguration) {
      warning(localize("The provided CAM machine configuration is overwritten by the postprocessor."));
      receivedMachineConfiguration = false; // CAM provided machine configuration is overwritten
    }
  }

  if (!receivedMachineConfiguration) {
    // multiaxis settings
    if (machineConfiguration.isHeadConfiguration()) {
      machineConfiguration.setVirtualTooltip(false); // translate the pivot point to the virtual tool tip for nonTCP rotary heads
    }

    // retract / reconfigure
    var performRewinds = false; // set to true to enable the rewind/reconfigure logic
    if (performRewinds) {
      machineConfiguration.enableMachineRewinds(); // enables the retract/reconfigure logic
      safeRetractDistance = (unit == IN) ? 1 : 25; // additional distance to retract out of stock, can be overridden with a property
      safeRetractFeed = (unit == IN) ? 20 : 500; // retract feed rate
      safePlungeFeed = (unit == IN) ? 10 : 250; // plunge feed rate
      machineConfiguration.setSafeRetractDistance(safeRetractDistance);
      machineConfiguration.setSafeRetractFeedrate(safeRetractFeed);
      machineConfiguration.setSafePlungeFeedrate(safePlungeFeed);
      var stockExpansion = new Vector(toPreciseUnit(0.1, IN), toPreciseUnit(0.1, IN), toPreciseUnit(0.1, IN)); // expand stock XYZ values
      machineConfiguration.setRewindStockExpansion(stockExpansion);
    }

    // multi-axis feedrates
    if (machineConfiguration.isMultiAxisConfiguration()) {
      machineConfiguration.setMultiAxisFeedrate(
        useTCP ? FEED_FPM : FEED_INVERSE_TIME,
        9999.99, // maximum output value for inverse time feed rates
        INVERSE_MINUTES, // INVERSE_MINUTES/INVERSE_SECONDS or DPM_COMBINATION/DPM_STANDARD
        0.5, // tolerance to determine when the DPM feed has changed
        1.0 // ratio of rotary accuracy to linear accuracy for DPM calculations
      );
      setMachineConfiguration(machineConfiguration);
    }

    /* home positions */
    // machineConfiguration.setHomePositionX(toPreciseUnit(0, IN));
    // machineConfiguration.setHomePositionY(toPreciseUnit(0, IN));
    // machineConfiguration.setRetractPlane(toPreciseUnit(0, IN));
  }
}
// End of machine configuration logic


/**
  Writes the specified block.
*/
function writeBlock() {
  if (properties.jobSequenceNumbers) {
    writeWords2("N" + sequenceNumber, arguments);
    sequenceNumber += properties.jobSequenceNumberIncrement;
  } else {
    writeWords(arguments);
  }
}

function FirmwareBase() {
  this.machineMode = undefined; //TYPE_MILLING, TYPE_JET
}

FirmwareBase.prototype.section = function () {
  this.machineMode = currentSection.type;
}

var currentFirmware;

// Called in every new gcode file
function onOpen() {
  currentFirmware.init();

  sequenceNumber = properties.jobSequenceNumberStart;
//  if (!properties.jobSeparateWordsWithSpace) {
//    setWordSeparator("");
//  }
  receivedMachineConfiguration = machineConfiguration.isReceived();
  if (typeof defineMachine == "function") {
    defineMachine(); // hardcoded machine configuration
  }
  activateMachine(); // enable the machine optimizations and settings
}

function setWorkPlane(abc) {
  // setCurrentABC() does send back the calculated ABC angles for indexing operations to the simulation.
  setCurrentABC(abc); // required for machine simulation
}


// Called at end of gcode file
function onClose() {
  writeActivityComment(" *** STOP begin ***");
  currentFirmware.flushMotions();
//  if (properties.gcodeStopFile == "") {
  onCommand(COMMAND_COOLANT_OFF);
  rapidMovementsXY(0, 0);
  onCommand(COMMAND_STOP_SPINDLE);
  currentFirmware.end();
  writeActivityComment(" *** STOP end ***");
//  } else {
//    loadFile(properties.gcodeStopFile);
//  }
  currentFirmware.close();
}

function onTerminate() {
  if (properties.OctoUpload) {
    UploadToOctoprint();
//    A_Deliberate_bug();
  }

}

var cutterOnCurrentPower;

function onSection() {

  // Write Start gcode of the documment (after the "onParameters" with the global info)
  if (isFirstSection()) {
    writeFirstSection();
  }
  writeActivityComment(" *** SECTION begin ***");


  //if (properties.commentSections) {
    // Machining type
    if (currentSection.type == TYPE_MILLING) {
      // Specific milling code
      writeComment(sectionComment + " - Milling - Tool: " + tool.number + " - " + tool.comment + " " + getToolTypeName(tool.type));
    }

    if (currentSection.type == TYPE_JET) {
      // Cutter mode used for different cutting power in PWM laser
      switch (currentSection.jetMode) {
        case JET_MODE_THROUGH:
          cutterOnCurrentPower = properties.cutterOnThrough;
          break;
        case JET_MODE_ETCHING:
          cutterOnCurrentPower = properties.cutterOnEtch;
          break;
        case JET_MODE_VAPORIZE:
          cutterOnCurrentPower = properties.cutterOnVaporize;
          break;
        default:
          error("Cutting mode is not supported.");
      }
      writeComment(sectionComment + " - Laser/Plasma - Cutting mode: " + getParameter("operation:cuttingMode"));
    }

    // Print min/max boundaries for each section
    vectorX = new Vector(1, 0, 0);
    vectorY = new Vector(0, 1, 0);
    writeComment(" X Min: " + xyzFormat.format(currentSection.getGlobalRange(vectorX).getMinimum()) + " - X Max: " + xyzFormat.format(currentSection.getGlobalRange(vectorX).getMaximum()));
    writeComment(" Y Min: " + xyzFormat.format(currentSection.getGlobalRange(vectorY).getMinimum()) + " - Y Max: " + xyzFormat.format(currentSection.getGlobalRange(vectorY).getMaximum()));
    writeComment(" Z Min: " + xyzFormat.format(currentSection.getGlobalZRange().getMinimum()) + " - Z Max: " + xyzFormat.format(currentSection.getGlobalZRange().getMaximum()));
    writeln("");
  //}

  currentFirmware.section(); //adjust mode

  onCommand(COMMAND_START_SPINDLE);

  onCommand(COMMAND_COOLANT_ON);
  // Display section name in LCD
  currentFirmware.display_text(" " + sectionComment);
}

function resetAll()
{
  xOutput.reset();
  yOutput.reset();
  zOutput.reset();
  fOutput.reset();
}

// Called in every section end
function onSectionEnd() {
  resetAll();
  writeActivityComment(" *** SECTION end ***");
  writeln("");
}

function onComment(message) {
  writeComment(message);
}

function UploadToOctoprint() {
  // var form = new FormData();
  // form.append("file", getOutputPath(), getOutputPath());
  // form.append("select", "true", "");
  // form.append("print", "false", "");

  // var url = properties.OctoUrl + "/api/files/local";
  // var request = XMLHttpRequest();
  // request.open("POST", url, false, "", "");
  // request.setRequestHeader("x-api-key", properties.OctoApi);
  // request.setRequestHeader("cache-control", "no-cache");
  // request.send(form);
  // log(request.response);

  var params = '-k -H "X-Api-Key: ' +
    properties.OctoApi +
    '" -F "select=false" -F "print=' +
    properties.OctoStart +
    '" -F "file=@' +
    getOutputPath() +
    '" "' +
    properties.OctoUrl +
    '/api/files/local"';

  log(params);
  execute("curl", params, properties.CurlHide, "");
}

var pendingRadiusCompensation = RADIUS_COMPENSATION_OFF;

function onRadiusCompensation() {
  pendingRadiusCompensation = radiusCompensation;
}
// Rapid movements
function onRapid(x, y, z) {
  rapidMovements(x, y, z);
}

// Feed movements
function onLinear(x, y, z, feed) {
  linearMovements(x, y, z, feed);
}

function onRapid5D(_x, _y, _z, _a, _b, _c) {
  error(localize("Multi-axis motion is not supported."));
}

function onLinear5D(_x, _y, _z, _a, _b, _c, feed) {
  error(localize("Multi-axis motion is not supported."));
}

function onCircular(clockwise, cx, cy, cz, x, y, z, feed) {
  if (pendingRadiusCompensation != RADIUS_COMPENSATION_OFF) {
    error(localize("Radius compensation cannot be activated/deactivated for a circular move."));
    return;
  }
  currentFirmware.circular(clockwise, cx, cy, cz, x, y, z, feed)
}

// Called on waterjet/plasma/laser cuts
var powerState = false;

function onPower(power) {
  if (power != powerState) {
    if (power) {
      writeActivityComment(" >>> LASER Power ON");
      currentFirmware.laserOn(cutterOnCurrentPower);
    } else {
      writeActivityComment(" >>> LASER Power OFF");
      currentFirmware.laserOff();
    }
    powerState = power;
  }
}

// Called on Dwell Manual NC invocation
function onDwell(seconds) {
  if (seconds > 99999.999) {
    warning(localize("Dwelling time is out of range."));
  }
  writeActivityComment(" >>> Dwell");
  currentFirmware.dwell(seconds);
}

// Called with every parameter in the documment/section
function onParameter(name, value) {

  // Write gcode initial info
  // Product version
  if (name == "generated-by") {
    writeComment(value);
    writeComment(" Posts processor: " + FileSystem.getFilename(getConfigurationPath()));
  }
  // Date
  if (name == "generated-at") writeComment(" Gcode generated: " + value + " GMT");
  // Document
  if (name == "document-path") writeComment(" Document: " + value);
  // Setup
  if (name == "job-description") writeComment(" Setup: " + value);

  // Get section comment
  if (name == "operation-comment") sectionComment = value;
}

function onMovement(movement) {
  //if (properties.commentMovements) {
    var jet = tool.isJetTool && tool.isJetTool();
    var id;
    switch (movement) {
      case MOVEMENT_RAPID:
        id = "MOVEMENT_RAPID";
        break;
      case MOVEMENT_LEAD_IN:
        id = "MOVEMENT_LEAD_IN";
        break;
      case MOVEMENT_CUTTING:
        id = "MOVEMENT_CUTTING";
        break;
      case MOVEMENT_LEAD_OUT:
        id = "MOVEMENT_LEAD_OUT";
        break;
      case MOVEMENT_LINK_TRANSITION:
        id = jet ? "MOVEMENT_BRIDGING" : "MOVEMENT_LINK_TRANSITION";
        break;
      case MOVEMENT_LINK_DIRECT:
        id = "MOVEMENT_LINK_DIRECT";
        break;
      case MOVEMENT_RAMP_HELIX:
        id = jet ? "MOVEMENT_PIERCE_CIRCULAR" : "MOVEMENT_RAMP_HELIX";
        break;
      case MOVEMENT_RAMP_PROFILE:
        id = jet ? "MOVEMENT_PIERCE_PROFILE" : "MOVEMENT_RAMP_PROFILE";
        break;
      case MOVEMENT_RAMP_ZIG_ZAG:
        id = jet ? "MOVEMENT_PIERCE_LINEAR" : "MOVEMENT_RAMP_ZIG_ZAG";
        break;
      case MOVEMENT_RAMP:
        id = "MOVEMENT_RAMP";
        break;
      case MOVEMENT_PLUNGE:
        id = jet ? "MOVEMENT_PIERCE" : "MOVEMENT_PLUNGE";
        break;
      case MOVEMENT_PREDRILL:
        id = "MOVEMENT_PREDRILL";
        break;
      case MOVEMENT_EXTENDED:
        id = "MOVEMENT_EXTENDED";
        break;
      case MOVEMENT_REDUCED:
        id = "MOVEMENT_REDUCED";
        break;
      case MOVEMENT_HIGH_FEED:
        id = "MOVEMENT_HIGH_FEED";
        break;
      case MOVEMENT_FINISH_CUTTING:
        id = "MOVEMENT_FINISH_CUTTING";
        break;
    }
    if (id == undefined) {
      id = String(movement);
    }
    writeComment(" " + id);
  //}
}

var currentSpindleSpeed = 0;

function setSpindeSpeed(_spindleSpeed, _clockwise) {
  if (currentSpindleSpeed != _spindleSpeed) {
    if (_spindleSpeed > 0) {
      currentFirmware.spindleOn(_spindleSpeed, _clockwise);
    } else {
      currentFirmware.spindleOff();
    }
    currentSpindleSpeed = _spindleSpeed;
  }
}

function onSpindleSpeed(spindleSpeed) {
  setSpindeSpeed(spindleSpeed, tool.clockwise);
}

function onCommand(command) {
//  if (properties.commentActivities) {
    var stringId = getCommandStringId(command);
    writeComment(" " + stringId);
//  }
  switch (command) {
    case COMMAND_START_SPINDLE:
      onCommand(tool.clockwise ? COMMAND_SPINDLE_CLOCKWISE : COMMAND_SPINDLE_COUNTERCLOCKWISE);
      return;
    case COMMAND_SPINDLE_CLOCKWISE:
      if (tool.jetTool)
        return;
      setSpindeSpeed(spindleSpeed, true);
      return;
    case COMMAND_SPINDLE_COUNTERCLOCKWISE:
      if (tool.jetTool)
        return;
      setSpindeSpeed(spindleSpeed, false);
      return;
    case COMMAND_STOP_SPINDLE:
      if (tool.jetTool)
        return;
      setSpindeSpeed(0, true);
      return;
    case COMMAND_COOLANT_ON:
      setCoolant(tool.coolant);
      return;
    case COMMAND_COOLANT_OFF:
      setCoolant(0);  //COOLANT_DISABLED
      return;
    case COMMAND_LOCK_MULTI_AXIS:
      return;
    case COMMAND_UNLOCK_MULTI_AXIS:
      return;
    case COMMAND_BREAK_CONTROL:
      return;
    case COMMAND_TOOL_MEASURE:
      if (tool.jetTool)
        return;
      return;
    case COMMAND_STOP:
      writeBlock(mFormat.format(0));
      return;
  }
}

function writeFirstSection() {
  // dump tool information
  var toolZRanges = {};
  var vectorX = new Vector(1, 0, 0);
  var vectorY = new Vector(0, 1, 0);
  var ranges = {
    x: { min: undefined, max: undefined },
    y: { min: undefined, max: undefined },
    z: { min: undefined, max: undefined },
  };
  var handleMinMax = function(pair, range) {
    var rmin = range.getMinimum();
    var rmax = range.getMaximum();
    if (pair.min == undefined || pair.min > rmin) {
      pair.min = rmin;
    }
    if (pair.max == undefined || pair.max < rmax) {
      pair.max = rmax;
    }
  }

  var numberOfSections = getNumberOfSections();
  for (var i = 0; i < numberOfSections; ++i) {
    var section = getSection(i);
    var tool = section.getTool();
    var zRange = section.getGlobalZRange();
    var xRange = section.getGlobalRange(vectorX);
    var yRange = section.getGlobalRange(vectorY);
    handleMinMax(ranges.x, xRange);
    handleMinMax(ranges.y, yRange);
    handleMinMax(ranges.z, zRange);
    if (is3D())  { // && properties.commentWriteTools) {
      if (toolZRanges[tool.number]) {
        toolZRanges[tool.number].expandToRange(zRange);
      } else {
        toolZRanges[tool.number] = zRange;
      }
    }
  }

  writeComment(" ");
  writeComment(" Ranges table:");
  writeComment(" X: Min=" + xyzFormat.format(ranges.x.min) + " Max=" + xyzFormat.format(ranges.x.max) + " Size=" + xyzFormat.format(ranges.x.max - ranges.x.min));
  writeComment(" Y: Min=" + xyzFormat.format(ranges.y.min) + " Max=" + xyzFormat.format(ranges.y.max) + " Size=" + xyzFormat.format(ranges.y.max - ranges.y.min));
  writeComment(" Z: Min=" + xyzFormat.format(ranges.z.min) + " Max=" + xyzFormat.format(ranges.z.max) + " Size=" + xyzFormat.format(ranges.z.max - ranges.z.min));

  //if (properties.commentWriteTools) {
    writeComment(" ");
    writeComment(" Tools table:");
    var tools = getToolTable();
    if (tools.getNumberOfTools() > 0) {
      for (var i = 0; i < tools.getNumberOfTools(); ++i) {
        var tool = tools.getTool(i);
        var comment = " T" + toolFormat.format(tool.number) + " D=" + xyzFormat.format(tool.diameter) + " CR=" + xyzFormat.format(tool.cornerRadius);
        if ((tool.taperAngle > 0) && (tool.taperAngle < Math.PI)) {
          comment += " TAPER=" + taperFormat.format(tool.taperAngle) + "deg";
        }
        if (toolZRanges[tool.number]) {
          comment += " - ZMIN=" + xyzFormat.format(toolZRanges[tool.number].getMinimum());
        }
        comment += " - " + getToolTypeName(tool.type) + " " + tool.comment;
        writeComment(comment);
      }
    }
  //}

  writeln("");
  writeActivityComment(" *** START begin ***");

  //if (properties.gcodeStartFile == "") {
  currentFirmware.start();
//  } else {
//    loadFile(properties.gcodeStartFile);
//  }
  writeActivityComment(" *** START end ***");
  writeln("");
}

// Output a comment
function writeComment(text) {
  currentFirmware.comment(text);
}

// Rapid movements with G1 and differentiated travel speeds for XY and Z
function rapidMovementsXY(_x, _y) {
  var x = xOutput.format(_x);
  var y = yOutput.format(_y);
  if (x || y) {
    if (pendingRadiusCompensation != RADIUS_COMPENSATION_OFF) {
      error(localize("Radius compensation mode cannot be changed at rapid traversal."));
      return;
    }
    f = fOutput.format(propertyMmToUnit(properties.jobTravelSpeedXY));
    writeBlock(gMotionModal.format(0), x, y, f);
  }
}
function rapidMovementsZ(_z) {
  var z = zOutput.format(_z);
  if (z) {
    if (pendingRadiusCompensation != RADIUS_COMPENSATION_OFF) {
      error(localize("Radius compensation mode cannot be changed at rapid traversal."));
      return;
    }
    f = fOutput.format(propertyMmToUnit(properties.jobTravelSpeedZ));
    writeBlock(gMotionModal.format(0), z, f);
  }
}

function rapidMovements(_x, _y, _z) {
  rapidMovementsZ(_z);
  rapidMovementsXY(_x, _y);
}

// Linear movements
function linearMovements(_x, _y, _z, _feed) {
  if (pendingRadiusCompensation != RADIUS_COMPENSATION_OFF) {
    // ensure that we end at desired position when compensation is turned off
    xOutput.reset();
    yOutput.reset();
  }
  var x = xOutput.format(_x);
  var y = yOutput.format(_y);
  var z = zOutput.format(_z);
  var f = fOutput.format(_feed);
  if (x || y || z) {
    if (pendingRadiusCompensation != RADIUS_COMPENSATION_OFF) {
      error(localize("Radius compensation mode is not supported."));
      return;
    } else {
      writeBlock(gMotionModal.format(1), x, y, z, f);
    }
  } else if (f) {
    if (getNextRecord().isMotion()) { // try not to output feed without motion
      fOutput.reset(); // force feed on next line
    } else {
      writeBlock(gMotionModal.format(1), f);
    }
  }
}

// Test if file exist/can read and load it
function loadFile(_file) {
  var folder = FileSystem.getFolderPath(getOutputPath()) + PATH_SEPARATOR;
  if (FileSystem.isFile(folder + _file)) {
    var txt = loadText(folder + _file, "utf-8");
    if (txt.length > 0) {
      writeActivityComment(" --- Start custom gcode " + folder + _file);
      write(txt);
      writeActivityComment(" --- End custom gcode " + folder + _file);
      writeln("");
    }
  } else {
    writeComment(" Can't open file " + folder + _file);
    error("Can't open file " + folder + _file);
  }
}

var currentCoolantMode = 0;

// Manage coolant state
function setCoolant(coolant) {
  if (currentCoolantMode == coolant) {
    return;
  }
  if (properties.coolantA_Mode != 0) {
    if (currentCoolantMode == properties.coolantA_Mode) {
      writeActivityComment(" >>> Coolant A OFF");
      currentFirmware.coolantA(true);
    } else if (coolant == properties.coolantA_Mode) {
      writeActivityComment(" >>> Coolant A ON");
      currentFirmware.coolantA(false);
    }
  }
  if (properties.coolantB_Mode != 0) {
    if (currentCoolantMode == properties.coolantB_Mode) {
      writeActivityComment(" >>> Coolant B OFF");
      currentFirmware.coolantB(true);
    } else if (coolant == properties.coolantB_Mode) {
      writeActivityComment(" >>> Coolant B ON");
      currentFirmware.coolantB(false);
    }
  }
  currentCoolantMode = coolant;
}

function propertyMmToUnit(_v) {
  return (_v / (unit == IN ? 25.4 : 1));
}

function writeActivityComment(_comment) {
//  if (properties.commentActivities) {
    writeComment(_comment);
//  }
}

function mergeProperties(to, from)
{
  for (var attrname in from) {
    to[attrname] = from[attrname];
  }
}

function Firmware3dPrinterLike() {
  FirmwareBase.apply(this, arguments);
  this.spindleEnabled= false;
}
Firmware3dPrinterLike.prototype = Object.create(FirmwareBase.prototype);
Firmware3dPrinterLike.prototype.constructor = Firmware3dPrinterLike;
Firmware3dPrinterLike.prototype.init = function () {
  gMotionModal = createModal({ force: true }, gFormat); // modal group 1 // G0-G3, ...
  // if (properties.jobMarlinEnforceFeedrate) {
  fOutput = createVariable({ force: true }, fFormat);
  // }
}
Firmware3dPrinterLike.prototype.start = function () {
  writeBlock(gAbsIncModal.format(90)); // Set to Absolute Positioning
  writeBlock(gUnitModal.format(unit == IN ? 20 : 21));
  // writeBlock(mFormat.format(84), sFormat.format(0)); // Disable steppers timeout
  // if (properties.jobSetOriginOnStart) {
  //   writeBlock(gFormat.format(92), xFormat.format(0), yFormat.format(0), zFormat.format(0)); // Set origin to initial position
  // }
}
Firmware3dPrinterLike.prototype.end = function () {
  this.display_text("Job end");
}
Firmware3dPrinterLike.prototype.close = function () {
}
Firmware3dPrinterLike.prototype.comment = function (text) {
  writeln(";" + String(text).replace(/[\(\)]/g, ""));
}
Firmware3dPrinterLike.prototype.flushMotions = function () {
  writeBlock(mFormat.format(400));
}
Firmware3dPrinterLike.prototype.spindleOn = function (_spindleSpeed, _clockwise) {
  if (properties.jobManualSpindlePowerControl) {
    // for manual any positive input speed assumed as enabled. so it's just a flag
    if (!this.spindleEnabled) {
//      this.askUser("Turn ON " + speedFormat.format(_spindleSpeed) + "RPM", "Spindle", false);
    }
  } else {
    writeActivityComment(" >>> Spindle Speed " + speedFormat.format(_spindleSpeed));
    writeBlock(mFormat.format(_clockwise ? 3 : 4), sOutput.format(spindleSpeed));
  }
  this.spindleEnabled = true;
}
Firmware3dPrinterLike.prototype.spindleOff = function () {
  // i dont want to have the spindle controlled in the gcode , eliminating M300 and M0
  //if (properties.jobManualSpindlePowerControl) {
    //writeBlock(mFormat.format(300), sFormat.format(300), pFormat.format(3000));
    //this.askUser("Turn OFF spindle", "Spindle", false);
  //} else {
  if (!properties.jobManualSpindlePowerControl) {
    writeBlock(mFormat.format(5));
  }
  this.spindleEnabled = false;
}
Firmware3dPrinterLike.prototype.laserOn = function (power) {
  var laser_pwm = power / 100 * 255;
  switch (properties.cutterMarlinMode) {
    case 106:
      writeBlock(mFormat.format(106), sFormat.format(laser_pwm));
      break;
    case 3:
      writeBlock(mFormat.format(3), oFormat.format(laser_pwm));
      break;
    case 42:
      writeBlock(mFormat.format(42), pFormat.format(properties.cutterMarlinPin), sFormat.format(laser_pwm));
      break;
  }
}
Firmware3dPrinterLike.prototype.laserOff = function () {
  switch (properties.cutterMarlinMode) {
    case 106:
      writeBlock(mFormat.format(107));
      break;
    case 3:
      writeBlock(mFormat.format(5));
      break;
    case 42:
      writeBlock(mFormat.format(42), pFormat.format(properties.cutterMarlinPin), sFormat.format(0));
      break;
  }
}
Firmware3dPrinterLike.prototype.coolantA = function (on) {
  writeBlock(on ? properties.coolantAMarlinOn : properties.coolantAMarlinOff);
}
Firmware3dPrinterLike.prototype.coolantB = function (on) {
  writeBlock(on ? properties.coolantBMarlinOn : roperties.coolantBMarlinOff);
}
Firmware3dPrinterLike.prototype.dwell = function (seconds) {
  writeBlock(gFormat.format(4), "S" + secFormat.format(seconds));
}
Firmware3dPrinterLike.prototype.display_text = function (txt) {
//  writeBlock(mFormat.format(117), (properties.jobSeparateWordsWithSpace ? "" : " ") + txt);
 // writeBlock(mFormat.format(117), " " + txt);

}
Firmware3dPrinterLike.prototype.circular = function (clockwise, cx, cy, cz, x, y, z, feed) {
  // Marlin supports arcs only on XY plane
  var start = getCurrentPosition();
  if (isFullCircle()) {
    if (isHelical()) {
      linearize(tolerance);
      return;
    }
    switch (getCircularPlane()) {
      case PLANE_XY:
        writeBlock(gMotionModal.format(clockwise ? 2 : 3), xOutput.format(x), iOutput.format(cx - start.x, 0), jOutput.format(cy - start.y, 0), fOutput.format(feed));
        break;
      default:
        linearize(tolerance);
    }
  } else {
    switch (getCircularPlane()) {
      case PLANE_XY:
        writeBlock(gMotionModal.format(clockwise ? 2 : 3), xOutput.format(x), yOutput.format(y), zOutput.format(z), iOutput.format(cx - start.x, 0), jOutput.format(cy - start.y, 0), fOutput.format(feed));
        break;
      default:
        linearize(tolerance);
    }
  }
}

Firmware3dPrinterLike.prototype.askUser = function (text, title, allowJog) {
//  writeBlock(mFormat.format(0), (properties.jobSeparateWordsWithSpace ? "" : " ") + text);
   writeBlock(mFormat.format(0), ( " ") + text);

}


 properties3dPrinter = {
//   jobMarlinEnforceFeedrate: false,     // Add feedrate to each movement line
//
//   cutterMarlinMode: 106,              // Marlin mode laser/plasma cutter
//   cutterMarlinPin: 4,               // Marlin laser/plasma cutter pin for M42
//
//   coolantAMarlinOn: "M42 P11 S255",        // GCode command to turn on Coolant channel A
//   coolantAMarlinOff: "M42 P11 S0",         // Gcode command to turn off Coolant channel A
//   coolantBMarlinOn: "M42 P6 S255",         // GCode command to turn on Coolant channel B
//   coolantBMarlinOff: "M42 P6 S0",          // Gcode command to turn off Coolant channel B
 };

 propertyDefinitions3dPrinter = {
//   jobMarlinEnforceFeedrate: {
//     title: "Job: Enforce Feedrate", description: "Add feedrate to each movement g-code", group: 1,
//     type: "boolean", default_mm: false, default_in: false
//   },
//   cutterMarlinMode: {
//     title: "Laser: Marlin/Reprap mode", description: "Marlin/Reprar mode of the laser/plasma cutter", group: 4,
//     type: "integer", default_mm: 106, default_in: 106,
//     values: [
//       { title: "M106 S{PWM}/M107", id: 106 },
//       { title: "M3 O{PWM}/M5", id: 3 },
//       { title: "M42 P{pin} S{PWM}", id: 42 },
//     ]
//   },
//   cutterMarlinPin: {
//     title: "Laser: Marlin M42 pin", description: "Marlin custom pin number for the laser/plasma cutter", group: 4,
//     type: "integer", default_mm: 4, default_in: 4
//   },
//
//   coolantAMarlinOn: { title: "Coolant: A On command", description: "GCode command to turn on Coolant channel A", group: 6, type: "string", default_mm: "M42 P11 S255" },
//   coolantAMarlinOff: {
//     title: "Coolant: A Off command", description: "Gcode command to turn off Coolant A", group: 6, type: "string",
//     default_mm: "M42 P11 S0", default_in: "M42 P11 S0"
//   },
//
//   coolantBMarlinOn: {
//     title: "Coolant: B On command", description: "GCode command to turn on Coolant channel B", group: 6, type: "string",
//     default_mm: "M42 P6 S255", default_in: "M42 P6 S255"
//   },
//   coolantBMarlinOff: {
//     title: "Coolant: B Off command", description: "Gcode command to turn off Coolant channel B", group: 6, type: "string",
//     default_mm: "M42 P6 S0", default_in: "M42 P6 S0"
//   },
 };
//
