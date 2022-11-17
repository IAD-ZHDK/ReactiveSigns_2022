void controlEvent(ControlEvent theControlEvent) {
  if (theControlEvent.isFrom("rangeController") ) {
    lowDistance = (theControlEvent.getController().getArrayValue(0));
    highDistance = (theControlEvent.getController().getArrayValue(1));
    if (lowDistance>=highDistance) {
      highDistance =lowDistance + 0.01;
    }

  }
  if (cameraRunning) {
    thresholdFilter.setMinDistance(lowDistance);
    thresholdFilter.setMaxDistance(highDistance);
  }
      CSVData.saveData();
}
