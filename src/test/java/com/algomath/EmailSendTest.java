package com.algomath;

import com.algomath.service.EmailService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailSendTest {

    @Autowired
    private EmailService emailService;

    @Test
    public void emailServiceTest(){
        emailService.send("shevchenko9542@gmail.com","TestSubject","Hello, this is the test message");
    }

}
