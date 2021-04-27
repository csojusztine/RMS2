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
@RequestMapping("/api")
@RestController
public class ContactController {


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

    @GetMapping("/confirm-work")
    public ModelAndView confirmWork(ModelAndView modelAndView, @RequestParam("token")String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
        String pageTitle;
        if(token != null) {
            Optional<Work> work = workRepository.findById(token.getWork().getId());
            Work _work = work.get();
            _work.setEnabled(true);
            workRepository.save(_work);
            pageTitle = "Work confirmed!";
            modelAndView.addObject("pagetitle", pageTitle);
        } else {
            modelAndView.addObject("message","The link is invalid or broken!");
            modelAndView.setViewName("error");
        }
        return modelAndView;
    }
}

