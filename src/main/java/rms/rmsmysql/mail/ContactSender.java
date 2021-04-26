package rms.rmsmysql.mail;

import javax.mail.MessagingException;

public interface ContactSender {
    void sendContact(String manufacturer, String type, String description, Integer price, String customers_email, String note) throws MessagingException;
}
