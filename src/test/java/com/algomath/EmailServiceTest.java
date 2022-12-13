package com.algomath;

import com.algomath.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.mail.javamail.JavaMailSender;


public class EmailServiceTest {

    @Test
    public void sendTest(){
        JavaMailSender emailSender = Mockito.mock(JavaMailSender.class);
        MimeMessage emailMessage = Mockito.mock(MimeMessage.class);

        Mockito.when(emailSender.createMimeMessage()).thenReturn(emailMessage);

        EmailService emailService = new EmailService(emailSender, "testSender@gmail.com");

        emailService.send("testReceiver@gmail.com","testSubject","testMessage");
        Mockito.verify(emailSender).send(Mockito.any(MimeMessage.class));
    }

}
