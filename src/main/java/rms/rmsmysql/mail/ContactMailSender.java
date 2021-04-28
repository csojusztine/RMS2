package rms.rmsmysql.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import rms.rmsmysql.entities.ConfirmationToken;
import rms.rmsmysql.entities.Machine;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.repository.ConfirmationTokenRepository;
import rms.rmsmysql.repository.MachineRepository;
import rms.rmsmysql.repository.WorkRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Component
public class ContactMailSender implements ContactSender{

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;


    @Override
    public void sendContact(String manufacturer, String type, String description, Integer price, String customers_email, String note, Work work) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("juszti27@gmail.com");
        helper.setSubject("Confirm the reparation");
        helper.setTo(customers_email);

        workRepository.save(work);

        ConfirmationToken confirmationToken = new ConfirmationToken(work);
        String senderName = "RMS Team";
        helper.setFrom("juszti27@gmail.com", senderName);

        confirmationTokenRepository.save(confirmationToken);

        String mailContent = "<p><b>Dear Customer!</b> <br>" + "<p>We need your permission to perform the work!</p>";
        mailContent+="<p><b> Your machine: </b>" + manufacturer + " " + type + "</p>";
        mailContent+="<p><b>Work description for the machine: </b>" + description + "</p>";
        mailContent+= "<p><b>Price of the work: </b>" + price.toString() + " Ft</p>";
        mailContent+= "<p><b>Any note from the worker: </b>" + note + "</p>";
        mailContent+= "<p>To confirm your work, please click here: " + "http://localhost:8080/confirmation?token="+ confirmationToken.getConfirmationToken();

        mailContent+="<p><b>RMS Company </b></p>";

        helper.setText(mailContent, true);

       this.javaMailSender.send(message);
    }

    public void sendIdentifier(Machine machine) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("juszti27@gmail.com");
        helper.setSubject("Your machine's identifier");

        machineRepository.save(machine);
        helper.setTo(machine.getCustomers_email());



        String senderName = "RMS Team";
        helper.setFrom("juszti27@gmail.com", senderName);


        String mailContent = "<p><b>Dear Customer!</b> <br>" + "<p>Thank your for choosing us!</p>";
        mailContent+="<p><b> Your machine: </b>" + machine.getManufacturer() + " " + machine.getType() + "</p>";

        mailContent+= "<p><b>Here is your machine identifier: </b>" + machine.getIdentifier() + "</p>";
        mailContent+= "<p>You can track it whenever you want.</p>";

        mailContent+="<p><b>RMS Company </b></p>";

        helper.setText(mailContent, true);

        this.javaMailSender.send(message);
    }
}
