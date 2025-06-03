package com.kltech.authentication_service.services;

import com.kltech.authentication_service.models.requests.UserRequest;
import com.kltech.authentication_service.models.responses.UserResponse;
import jakarta.transaction.Transactional;
import java.util.List;

public interface IUserService {

  List<UserResponse> findAll();

  @Transactional
  void update(String id, UserRequest userRequest);

  @Transactional
  void delete(String id);

  @Transactional
  UserResponse findById(String id);
}
