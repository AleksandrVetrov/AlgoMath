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

    private final JavaMailSender emailSender;
    private final String sender;

    @Autowired
    public EmailService(JavaMailSender emailSender,@Value ("${spring.mail.username}") String sender){
        this.emailSender = emailSender;
        this.sender = sender;
    }

    @Override
    @Async
    public void send(String receiver, String subject ,String message){
        try{
            MimeMessage mimeMessage = emailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(receiver);
            mimeMessageHelper.setSubject(subject);
            mimeMessageHelper.setText(message);

            emailSender.send(mimeMessage);
        } catch(MessagingException ex) {
            throw new IllegalStateException("failed to send message");
        }
    }
}
