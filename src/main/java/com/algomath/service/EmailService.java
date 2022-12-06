package com.algomath.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class EmailService implements EmailSender {
    @Autowired
    private JavaMailSender mailSender;

    @Value ("${spring.mail.username}")
    private String emailSender;

    public EmailService(){}

    @Override
    @Async
    public void send(String emailReceiver, String subject ,String message){
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setFrom(emailSender);
            mimeMessageHelper.setTo(emailReceiver);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(message);

            mailSender.send(mimeMessage);
        } catch(MessagingException ex) {
            throw new IllegalStateException("failed to send message");
        }
    }
}
