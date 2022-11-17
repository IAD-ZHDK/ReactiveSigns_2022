void sendPImage(PImage image, PVector pos, boolean tracking) {
  OscMessage msg = new OscMessage("/depth");
  msg.add(image.width);
  msg.add(image.height);

  // fill depth buffer
  int[] pixels = image.pixels;
  for (int i = 0; i < pixels.length; i++) {
    depthBuffer[i] = (byte)(pixels[i] & 0xFF);
  }
  msg.add(depthBuffer);
  msg.add(pos.x);
  msg.add(pos.y);
  msg.add(pos.z);
  msg.add(int(tracking));
  try {
    ws.sendMessage(msg.getBytes());
  }
  catch(Exception ex) {
    println("ERROR: " + ex.getMessage());
  }
}
