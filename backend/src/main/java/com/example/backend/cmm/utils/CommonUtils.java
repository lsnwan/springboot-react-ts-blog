package com.example.backend.cmm.utils;

import com.example.backend.cmm.error.exception.CustomUnknownClientException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Date;
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

        if (cookies == null) {
            return null;
        }

        for(Cookie c : cookies) {
            if (c.getName().equals(key)) {
                result = c.getValue();
                break;
            }
        }
        return result;
    }

    /**
     * 쿠키 저장
     * @param response
     * @param name
     * @param value
     * @param maxAge
     */
    public static void setCookie(HttpServletResponse response, String name, String value, int maxAge, String path, String domain, boolean isSecure, boolean isHttpOnly) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge);
        cookie.setPath(path);
        cookie.setDomain(domain);
        cookie.setSecure(isSecure);
        cookie.setHttpOnly(isHttpOnly);
        response.addCookie(cookie);
    }

    /**
     * 쿠키 삭제
     * @param response
     * @param name
     */
    public static void deleteCookie(HttpServletResponse response, String name) {
        Cookie deleteCookie = new Cookie(name, null);
        deleteCookie.setMaxAge(0);
        response.addCookie(deleteCookie);
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

    /**
     * Date to Int
     * @param date
     * @return
     */
    public static int dateToInt(Date date) {
        long milliseconds = date.getTime();
        return (int) (milliseconds / 1000); // 초 단위로 변환
    }

    /**
     * 브라우저 이름 추출
     * @param userAgent
     * @return
     */
    public static String getBrowserName(String userAgent) {
        String clientInfo = "";

        if(userAgent.indexOf("Trident") > -1) {												// IE
            clientInfo = "ie";
        } else if(userAgent.indexOf("Edge") > -1) {											// Edge
            clientInfo = "edge";
        } else if(userAgent.indexOf("Whale") > -1) { 										// Naver Whale
            clientInfo = "whale";
        } else if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) { 		// Opera
            clientInfo = "opera";
        } else if(userAgent.indexOf("Firefox") > -1) { 										 // Firefox
            clientInfo = "firefox";
        } else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 ) {	 // Safari
            clientInfo = "safari";
        } else if(userAgent.indexOf("Chrome") > -1) {										 // Chrome
            clientInfo = "chrome";
        }

        // 웹 브라우저인 경우
//        if (userAgent != null && userAgent.toLowerCase().contains("mozilla")) {
//            if (userAgent.contains("Firefox")) {
//                clientInfo = "Firefox browser";
//            } else if (userAgent.contains("Chrome")) {
//                clientInfo = "Chrome browser";
//            } else if (userAgent.contains("MSIE") || userAgent.contains("Trident/7")) {
//                clientInfo = "Internet Explorer browser";
//            } else if (userAgent.contains("Safari")) {
//                clientInfo = "Safari browser";
//            } else {
//                clientInfo = "Other browser";
//            }
//        }
//        // 모바일 디바이스인 경우
//        else {
//            if (userAgent.contains("Android")) {
//                clientInfo = "Android";
//            } else if (userAgent.contains("iPhone")) {
//                clientInfo = "iPhone";
//            } else if (userAgent.contains("iPad")) {
//                clientInfo = "iPad";
//            } else {
//                clientInfo = "Other device";
//            }
//        }

        return clientInfo;
    }
}
