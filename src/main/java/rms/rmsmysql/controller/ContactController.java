package rms.rmsmysql.controller;



import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import rms.rmsmysql.mail.ContactMailSender;
import rms.rmsmysql.mail.ContactSender;
import rms.rmsmysql.model.ContactModel;

@CrossOrigin
@RequestMapping("/api")
@RestController
public class ContactController {


    @Autowired
    private ContactMailSender contactMailSender;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/contact")
    public String showContactForm() {
        return "contact_form";
    }

    /*@PostMapping("/contact")
    public String submitContact(HttpServletRequest request) throws MessagingException {
        String manufacturer = request.getParameter("manufacturer");
        String type = request.getParameter("type");
        String description = request.getParameter("description");
        String e_mail = request.getParameter("e_mail");
        String price = request.getParameter("price");
        String note = request.getParameter("note");

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);


        String mailSubject = "RMS Company has sent a message";
        String mailContent = "<p><b>Dear Customer! Your machine: " + manufacturer + type + "needs serious repair</p>";
        mailContent+="Work dexcription for the machine" + description;
        mailContent+= "Price of the work" + price;
        mailContent+= "Any note from the worker: " + note;

        helper.setFrom("juszti27@gmail.com");
        helper.setTo("ivic46@gmail.com");
        helper.setSubject(mailSubject);
        helper.setText(mailContent, true);

        mailSender.send(message);


        return "message";
    }*/

    @PostMapping("/contact")
    public void sendContact(@RequestBody ContactModel contactModel,
                             BindingResult bindingResult) throws MessagingException {
        if(bindingResult.hasErrors()){
            throw new ValidationException("Feedback has errors; Can not send it;");
        }

        this.contactMailSender.sendContact(
                contactModel.getManufacturer(),
                contactModel.getType(),
                contactModel.getDescription(),
                contactModel.getPrice(),
                contactModel.getCustomers_email(),
                contactModel.getNote()
        );


    }
}

