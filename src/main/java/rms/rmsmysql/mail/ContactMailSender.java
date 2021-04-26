package rms.rmsmysql.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class ContactMailSender implements ContactSender{

    @Autowired
    private JavaMailSender javaMailSender;


    @Override
    public void sendContact(String manufacturer, String type, String description, Integer price, String customers_email, String note) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("juszti27@gmail.com");
        helper.setSubject("RMS Company sent a message");
        helper.setTo(customers_email);


        String mailContent = "<p><b>Dear Customer! <br><br> Your machine: </b>" + manufacturer + " " + type + "</p>";
        mailContent+="<p><b>Work description for the machine: </b>" + description + "</p>";
        mailContent+= "<p><b>Price of the work: </b>" + price.toString() + " Ft</p>";
        mailContent+= "<p><b>Any note from the worker: </b>" + note + "</p>";

        helper.setText(mailContent, true);

       this.javaMailSender.send(message);
    }
}
