function letterFrame(){
	switch (_frame) {
	case 0:
  	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
		_E.draw(screen3.x,0,screen1.h);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,0,screen1.h/3);
    break;

	case 6:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,0,screen1.h/3);
    break; 

    case 7:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3*2);
		_A.draw(screen2.x,0,screen1.h/3);
    break;

    case 8:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3*2);
		_A.draw(screen3.x,0,screen1.h/3);
    break;

    case 9:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3*2);
		_A.draw(screen3.x,0,screen1.h/3);
    break;

    case 10:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h/3);
    break;

    case 11:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3);
		_T.draw(screen2.x,0,screen1.h/3);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h/3);
    break;

    case 12:
		_E.draw(0,screen1.h/3,screen1.h/3);
		_T.draw(screen2.x,0,screen1.h/3);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h/3);
    break;

    case 13:
		_E.draw(0,screen1.h/3,screen1.h/3);
		_T.draw(screen2.x,0,screen1.h/3);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 14:
		_E.draw(0,0,screen1.h/3*2);
		_T.draw(screen2.x,0,screen1.h/3);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 15:
		_E.draw(0,0,screen1.h/3*2);
		_T.draw(screen2.x,0,screen1.h);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 16:
		_E.draw(0,0,screen1.h/3);
		_T.draw(screen2.x,0,screen1.h);
		_H.draw(0,screen1.h/3*2,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 17:
		_E.draw(0,0,screen1.h/3);
		_T.draw(screen2.x,0,screen1.h);
		_H.draw(0,screen1.h/3,screen1.h/3*2);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 18:
		_E.draw(0,0,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,screen1.h/3,screen1.h/3*2);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 19:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,screen1.h/3,screen1.h/3*2);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 20:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,0,screen1.h);
    break;

    case 21:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(screen2.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,screen1.h/3,screen1.h/3*2);
    break;

    case 22:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,screen1.h/3,screen1.h/3*2);
    break;

    case 23:
		_E.draw(screen2.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,screen1.h/3,screen1.h/3*2);
    break;

    case 24:
		_E.draw(screen2.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,screen1.h/3*2,screen1.h/3);
    break;

    case 25:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen3.x,screen1.h/3*2,screen1.h/3);
    break;

    case 26:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3*2,screen1.h/3);
    break;

    case 27:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,0,screen1.h);
    break;

    case 28:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 29:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3,screen1.h/3*2);
		_H.draw(screen2.x,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 30:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,0,screen1.h/3*2);
		_H.draw(screen2.x,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 31:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(0,0,screen1.h/3*2);
		_H.draw(screen2.x,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 32:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(0,0,screen1.h/3*2);
		_H.draw(screen3.x,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 33:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(0,screen1.h/3*2,screen1.h/3);
		_H.draw(screen3.x,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 34:
		_E.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_T.draw(0,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 35:
		_E.draw(screen3.x,0,screen1.h);
		_T.draw(0,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 36:
		_E.draw(screen3.x,0,screen1.h);
		_T.draw(0,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,0,screen1.h/3*2);
    break;

    case 37:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(0,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,0,screen1.h/3*2);
    break;

    case 38:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(screen3.x,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h/3);
		_A.draw(screen2.x,0,screen1.h/3*2);
    break;

    case 39:
		_E.draw(screen3.x,0,screen1.h/3*2);
		_T.draw(screen3.x,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,0,screen1.h/3*2);
    break;

    case 40:
		_E.draw(screen3.x,0,screen1.h/3);
		_T.draw(screen3.x,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,0,screen1.h/3*2);
    break;

    case 41:
		_E.draw(screen3.x,0,screen1.h/3);
		_T.draw(screen3.x,screen1.h/3*2,screen1.h/3);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 42:
		_E.draw(screen3.x,0,screen1.h/3);
		_T.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 43:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(screen3.x,screen1.h/3,screen1.h/3*2);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

    case 44:
	case 45:
	case 46:
	case 47:
	case 48:
	case 49:
    case 50:
		_E.draw(screen2.x,0,screen1.h/3);
		_T.draw(screen3.x,0,screen1.h);
		_H.draw(0,0,screen1.h);
		_A.draw(screen2.x,screen1.h/3,screen1.h/3*2);
    break;

	default:
 }
}