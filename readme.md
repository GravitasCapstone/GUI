# Network Accessed GUI

The function of this GUI is to be able to read visualized data, and communicate directly to the CCU from the GUI.
This GUI can read sensor data from 4 ZSUs (Zone Sensor Unit) and 2 ESUs (Extreme Sensor Unit) and able to configure dampers, zones, and the air handler unit.

## Pages

- Homepage/Index
- Setup
- Zones
- Diagnostics
- Schedules
- Help

## Setup

- Issues: When writing to the SD Card through the EasyPIC Development Board, it takes many requests to actually write the file. This issue started occuring after adding the SaveSchedule() function to the C code. More investigation is needed on this.
- Potential Solution: Writing the setup file in chunks at a time instead of all at once. I believe the string of data being POSTed is too much for the PIC32MZ to handle.

## Zones

- Issues: the relative url to GET is hardcoded to zoneData.csv. I need to make the URL relative to the current date. Shouldn't be a big deal...

## Diagnostics

- Issues: has not gone through testing due to the inability to load and run the GUI on CCU 1B. Basically the same as the zones page.

## Schedules

- Should be 100% functional, needs to go through more testing.

## Help

- This is just a download prompt for the User Manual PDF (not functional)
