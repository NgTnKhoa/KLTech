package com.kltech.authentication_service.controllers;

import com.kltech.authentication_service.models.requests.UserRequest;
import com.kltech.authentication_service.models.responses.UserResponse;
import com.kltech.authentication_service.services.IUserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth/users")
@RequiredArgsConstructor
public class  UserController {

  private final IUserService IUserService;

  @GetMapping
  public ResponseEntity<List<UserResponse>> findAll() {
    return ResponseEntity.ok(IUserService.findAll());
  }

  @PutMapping("/{id}")
  public ResponseEntity<UserResponse> update(@PathVariable String id, @RequestBody UserRequest userRequest) {
    return ResponseEntity.ok(IUserService.update(id, userRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable String id) {
    IUserService.delete(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponse> findById(@PathVariable String id) {
    return ResponseEntity.ok(IUserService.findById(id));
  }
}
