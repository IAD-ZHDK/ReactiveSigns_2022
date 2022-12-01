void sendPImage(PImage image, PImage rgbImage, PVector pos, boolean tracking, String label) {
  OscMessage msg = new OscMessage(label); 
  msg.add(image.width);
  msg.add(image.height);

  // fill depth buffer
  int[] pixels = image.pixels;
  for (int i = 0; i < pixels.length; i++) {
    depthBuffer[i] = byte(pixels[i] & 0xFF);
  }

  msg.add(depthBuffer);
  msg.add(pos.x);
  msg.add(pos.y);
  msg.add(pos.z);
  msg.add(int(tracking));

  if (streamRGB) {
      // send RGB info
    int[] rgbPixels = rgbImage.pixels;
    for (int i = 0; i < pixels.length; i++) {
      depthBuffer[i] = byte(pixels[i] & 0xFF);
      rBuffer[i] = byte((rgbPixels[i] & 0xFF0000) >> 16);
      gBuffer[i] = byte((rgbPixels[i] & 0xFF00) >> 8);
      bBuffer[i] = byte((rgbPixels[i] & 0xFF));
      // depthBuffer[i] = depthBuffer[i] & 0xFF  );
    }
    msg.add(rBuffer);
    msg.add(gBuffer);
    msg.add(bBuffer);
  }


  try {
    ws.sendMessage(msg.getBytes());
  }
  catch(Exception ex) {
    println("ERROR: " + ex.getMessage());
  }
}
