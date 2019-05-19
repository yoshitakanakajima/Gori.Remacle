function isPhoneNember(val) {
    var tel = val.replace(/-/g, "");

    if (tel == '' || tel == null || tel.match(/[^0-9]+/) || tel.length != 11) {
        return false;
    } else if (!tel.substr(0, 3).match('020|060|070|080|090')) {
        return false;
    }

    return true;
}