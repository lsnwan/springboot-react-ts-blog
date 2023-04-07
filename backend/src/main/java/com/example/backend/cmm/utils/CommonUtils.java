package com.example.backend.cmm.utils;

import com.example.backend.cmm.error.exception.CustomUnknownClientException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class CommonUtils {

    public static String getOperationSystem() {
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("win")) {
            return "windows";
        } else if (os.contains("mac")) {
            return "mac";
        } else if (os.contains("nix") || os.contains("nux") || os.indexOf("aix") > 0 ) {
            return "unix";
        } else if (os.contains("sunos")) {
            return "solaris";
        }

        return os;
    }

    /**
     * 쿠키 값 가져오기
     * @param request
     * @param key
     * @return
     */
    public static String getCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        String result = null;
        for(Cookie c : cookies) {
            if (c.getName().equals(key)) {
                result = c.getValue();
                break;
            }
        }
        return result;
    }

    public static String getClientIp() {

        try {
            Enumeration<NetworkInterface> nienum = NetworkInterface.getNetworkInterfaces();
            while (nienum.hasMoreElements()) {
                NetworkInterface ni = nienum.nextElement();
                Enumeration<InetAddress> kk= ni.getInetAddresses();
                while (kk.hasMoreElements()) {
                    InetAddress inetAddress = kk.nextElement();
                    if (!inetAddress.isLoopbackAddress() &&
                            !inetAddress.isLinkLocalAddress() &&
                            inetAddress.isSiteLocalAddress()) {
                        return inetAddress.getHostAddress();
                    }
                }
            }
        } catch (SocketException e) {
            throw new CustomUnknownClientException(e.getMessage());
        }

        return null;
    }

}
