package com.kltech.notificationservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
class RabbitMQConfig {

  @Value("${notification.order-events-exchange}")
  private String orderEventsExchange;

  @Value("${notification.new-orders-queue}")
  private String newOrdersQueue;

  @Value("${notification.delivered-orders-queue}")
  private String deliveredOrdersQueue;

  @Value("${notification.cancelled-orders-queue}")
  private String cancelledOrdersQueue;

  @Value("${notification.error-orders-queue}")
  private String errorOrdersQueue;

  @Bean
  DirectExchange exchange() {
    return new DirectExchange(orderEventsExchange);
  }

  @Bean
  Queue newOrdersQueue() {
    return QueueBuilder.durable(newOrdersQueue).build();
  }

  @Bean
  Binding newOrdersQueueBinding() {
    return BindingBuilder.bind(newOrdersQueue()).to(exchange()).with(newOrdersQueue);
  }

  @Bean
  Queue deliveredOrdersQueue() {
    return QueueBuilder.durable(deliveredOrdersQueue).build();
  }

  @Bean
  Binding deliveredOrdersQueueBinding() {
    return BindingBuilder.bind(deliveredOrdersQueue()).to(exchange()).with(deliveredOrdersQueue);
  }

  @Bean
  Queue cancelledOrdersQueue() {
    return QueueBuilder.durable(cancelledOrdersQueue).build();
  }

  @Bean
  Binding cancelledOrdersQueueBinding() {
    return BindingBuilder.bind(cancelledOrdersQueue()).to(exchange()).with(cancelledOrdersQueue);
  }

  @Bean
  Queue errorOrdersQueue() {
    return QueueBuilder.durable(errorOrdersQueue).build();
  }

  @Bean
  Binding errorOrdersQueueBinding() {
    return BindingBuilder.bind(errorOrdersQueue()).to(exchange()).with(errorOrdersQueue);
  }

  @Bean
  public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, ObjectMapper objectMapper) {
    final var rabbitTemplate = new RabbitTemplate(connectionFactory);
    rabbitTemplate.setMessageConverter(jacksonConverter(objectMapper));
    return rabbitTemplate;
  }

  @Bean
  public Jackson2JsonMessageConverter jacksonConverter(ObjectMapper mapper) {
    return new Jackson2JsonMessageConverter(mapper);
  }
}
