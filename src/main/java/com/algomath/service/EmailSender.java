package com.algomath.service;

public interface EmailSender {
    void send(String emailReceiver, String subject, String message);
}
