package rms.rmsmysql.mail;

import rms.rmsmysql.entities.Work;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface ContactSender {
    void sendContact(String manufacturer, String type, String description, Integer price, String customers_email, String note, Work work) throws MessagingException, UnsupportedEncodingException;
}
