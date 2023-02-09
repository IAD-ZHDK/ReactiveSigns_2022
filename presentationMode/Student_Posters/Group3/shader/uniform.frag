        precision highp float;

		varying vec2 vTexCoord;
		uniform float boolF;
        uniform float balls;
		uniform float winWidth;
		uniform float winHeight;
		uniform float minF;
		uniform float maxF;
        uniform vec3 metaballs[500];
		uniform float elapsedTime;
		uniform float mouseLoc;
		uniform float mouseLoc2;

		void main() {
			float x = vTexCoord.x * winWidth ;
			float y = vTexCoord.y * winHeight;
			float v = 0.0;
			for (float i = 0.0; i < 440.; i++) {
				vec3 ball = metaballs[int(i)];
				float dx = ball.x - x;
				float dy = ball.y - y;
				float r = ball.z;
				v += r * r / (dx * dx + dy * dy);
			}
			if (boolF == 1.0) {
				if (minF < v && v < maxF) {
					float a = (v - 0.9) * 4.;
					gl_FragColor = vec4(vec3(255.,255.,255.), 1);
				} else gl_FragColor = vec4(vec3(0, 0, 0), 1.0);
			} else {
				if (minF < v && v < maxF) {
					float a = (v - 0.9) * 4.;
					gl_FragColor = vec4(vec3(0.,0.,0.),1.0);
				} else gl_FragColor = vec4(vec3(255., 255., 255.), 1);
			}
		}

