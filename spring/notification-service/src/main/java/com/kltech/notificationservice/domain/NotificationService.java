package com.kltech.notificationservice.domain;

import com.kltech.notificationservice.domain.models.OrderCancelledEvent;
import com.kltech.notificationservice.domain.models.OrderCreatedEvent;
import com.kltech.notificationservice.domain.models.OrderDeliveredEvent;
import com.kltech.notificationservice.domain.models.OrderErrorEvent;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

  private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

  private JavaMailSender emailSender;

  @Value("${notification.support-email}")
  private String supportEmail;

  public void sendOrderCreatedNotification(OrderCreatedEvent event) {
    String message =
        """
            ===================================================
            Order Created Notification
            ----------------------------------------------------
            Dear %s,
            Your order with orderNumber: %s has been created successfully.
            
            Thanks,
            BookStore Team
            ===================================================
            """
            .formatted(event.customer().name(), event.orderNumber());
    log.info("\n{}", message);
    sendEmail(event.customer().email(), "Order Created Notification", message);
  }

  public void sendOrderDeliveredNotification(OrderDeliveredEvent event) {
    String message =
        """
            ===================================================
            Order Delivered Notification
            ----------------------------------------------------
            Dear %s,
            Your order with orderNumber: %s has been delivered successfully.
            
            Thanks,
            BookStore Team
            ===================================================
            """
            .formatted(event.customer().name(), event.orderNumber());
    log.info("\n{}", message);
    sendEmail(event.customer().email(), "Order Delivered Notification", message);
  }

  public void sendOrderCancelledNotification(OrderCancelledEvent event) {
    String message =
        """
            ===================================================
            Order Cancelled Notification
            ----------------------------------------------------
            Dear %s,
            Your order with orderNumber: %s has been cancelled.
            Reason: %s
            
            Thanks,
            BookStore Team
            ===================================================
            """
            .formatted(event.customer().name(), event.orderNumber(), event.reason());
    log.info("\n{}", message);
    sendEmail(event.customer().email(), "Order Cancelled Notification", message);
  }

  public void sendOrderErrorEventNotification(OrderErrorEvent event) {
    String message =
        """
            ===================================================
            Order Processing Failure Notification
            ----------------------------------------------------
            Hi %s,
            The order processing failed for orderNumber: %s.
            Reason: %s
            
            Thanks,
            BookStore Team
            ===================================================
            """
            .formatted(supportEmail, event.orderNumber(), event.reason());
    log.info("\n{}", message);
    sendEmail(supportEmail, "Order Processing Failure Notification", message);
  }

  private void sendEmail(String recipient, String subject, String content) {
    try {
      MimeMessage mimeMessage = emailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setFrom(supportEmail);
      helper.setTo(recipient);
      helper.setSubject(subject);
      helper.setText(content);
      emailSender.send(mimeMessage);
      log.info("Email sent to: {}", recipient);
    } catch (Exception e) {
      throw new RuntimeException("Error while sending email", e);
    }
  }
}
