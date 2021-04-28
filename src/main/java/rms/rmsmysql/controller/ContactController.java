package rms.rmsmysql.controller;



import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import rms.rmsmysql.entities.ConfirmationToken;
import rms.rmsmysql.entities.Work;
import rms.rmsmysql.mail.ContactMailSender;
import rms.rmsmysql.mail.ContactSender;
import rms.rmsmysql.model.ContactModel;
import rms.rmsmysql.repository.ConfirmationTokenRepository;
import rms.rmsmysql.repository.WorkRepository;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@CrossOrigin
@RequestMapping()
@RestController
public class ContactController {


    private static final Logger logger = LoggerFactory.getLogger(MachineController.class);

    @Autowired
    private ContactMailSender contactMailSender;

    @Autowired
    private WorkRepository workRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @PostMapping("/contact")
    public void sendContact(@RequestBody ContactModel contactModel,
                             BindingResult bindingResult) throws MessagingException, UnsupportedEncodingException {
        if(bindingResult.hasErrors()){
            throw new ValidationException("Feedback has errors; Can not send it;");
        }

        this.contactMailSender.sendContact(
                contactModel.getManufacturer(),
                contactModel.getType(),
                contactModel.getDescription(),
                contactModel.getPrice(),
                contactModel.getCustomers_email(),
                contactModel.getNote(),
                contactModel.getWork()
        );


    }

    @GetMapping("/confirmation")
    public String confirmation(@RequestParam("token")String confirmationToken, Model model) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null) {
            Optional<Work> work = workRepository.findById(token.getWork().getId());
            logger.info(work.get().getDescription());

            token.setEnabled(true);
            confirmationTokenRepository.save(token);

            model.addAttribute("message", "The work is successfully confirmed!");
        } else {
            model.addAttribute("message", "Your activation token is invalid!");
        }

        return "Confirmed";
    }
}

