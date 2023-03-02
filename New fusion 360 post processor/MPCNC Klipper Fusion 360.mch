{
   "controller" : {
      "default" : {
         "max_block_processing_speed" : 0,
         "max_normal_speed" : 0,
         "parts" : {
            "X" : {
               "coordinate" : 0,
               "max_normal_speed" : 0,
               "max_rapid_speed" : 0,
               "preference" : "negative",
               "reset" : "never",
               "reversed" : false,
               "tcp" : false,
               "zero_position_offset" : 0
            },
            "Y" : {
               "coordinate" : 1,
               "max_normal_speed" : 0,
               "max_rapid_speed" : 0,
               "preference" : "no preference",
               "reset" : "never",
               "reversed" : false,
               "tcp" : true,
               "zero_position_offset" : 0
            },
            "Z" : {
               "coordinate" : 2,
               "max_normal_speed" : 0,
               "max_rapid_speed" : 0,
               "preference" : "no preference",
               "reset" : "never",
               "reversed" : false,
               "tcp" : true,
               "zero_position_offset" : 0
            }
         }
      }
   },
   "general" : {
      "capabilities" : [ "cutting", "milling", "turning" ],
      "description" : "Generic 3-axis",
      "minimumRevision" : 45805,
      "vendor" : "MPCNC KLIPPER 2.0"
   },
   "kinematics" : {
      "default" : {
         "conventions" : {
            "rotation" : "right-handed"
         },
         "parts" : [
            {
               "control" : "driven",
               "direction" : [ -1, -0, -0 ],
               "id" : "X",
               "name" : "X",
               "parts" : [
                  {
                     "control" : "driven",
                     "direction" : [ 0, -1, 0 ],
                     "id" : "Y",
                     "name" : "Y",
                     "parts" : [
                        {
                           "control" : "driven",
                           "direction" : [ 0, 0, -1 ],
                           "id" : "Z",
                           "name" : "Z",
                           "parts" : [
                              {
                                 "attach_frame" : {
                                    "point" : [ 0, 0, 0 ],
                                    "x_direction" : [ 1, 0, 0 ],
                                    "z_direction" : [ 0, 0, 1 ]
                                 },
                                 "display_name" : "table",
                                 "id" : "table",
                                 "type" : "table"
                              }
                           ],
                           "type" : "linear"
                        }
                     ],
                     "type" : "linear"
                  }
               ],
               "type" : "linear"
            },
            {
               "attach_frame" : {
                  "point" : [ 0, 0, 0 ],
                  "x_direction" : [ 1, 0, 0 ],
                  "z_direction" : [ 0, 0, 1 ]
               },
               "display_name" : "head",
               "id" : "head",
               "spindle" : {
                  "max_speed" : 0,
                  "min_speed" : 0
               },
               "tool_station" : {
                  "coolants" : [ "flood" ],
                  "max_tool_diameter" : 0,
                  "max_tool_length" : 0
               },
               "type" : "head"
            }
         ],
         "units" : {
            "angle" : "degrees",
            "length" : "mm"
         }
      }
   },
   "machining" : {
      "default" : {
         "feedrate_ratio" : 1,
         "tool_change_time" : 15
      }
   },
   "post" : {
      "default" : {
         "output_folder" : "/Users/cristianku/Downloads",
         "path" : "cloud://MPCNC Klipper Fusion 360.cps"
      }
   },
   "tooling" : {
      "default" : {
         "has_tool_changer" : false,
         "number_of_tools" : 100,
         "supports_tool_preload" : false
      }
   }
}

