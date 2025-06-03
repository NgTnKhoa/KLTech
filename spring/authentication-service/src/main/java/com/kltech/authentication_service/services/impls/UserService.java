package com.kltech.authentication_service.services.impls;

import com.kltech.authentication_service.mappers.UserMapper;
import com.kltech.authentication_service.models.requests.UserRequest;
import com.kltech.authentication_service.models.responses.UserResponse;
import com.kltech.authentication_service.services.IUserService;
import com.kltech.authentication_service.entities.User;
import com.kltech.authentication_service.repositories.UserRepository;
import com.kltech.authentication_service.exception.ApiRequestException;
import com.kltech.authentication_service.exception.ErrorCode;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserMapper userMapper;
  private final UserRepository userRepository;

  @Override
  public List<UserResponse> findAll() {
    return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
  }

  @Override
  public void update(String id, UserRequest userRequest) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

    if (userRequest.getRole() != null) {
      user.setRole(userRequest.getRole());
    }

    userMapper.toUserEntity(userRequest, user);

    userRepository.save(user);
  }

  @Override
  public void delete(String id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
    } else {
      throw new RuntimeException("User not found");
    }
  }

  @Override
  public UserResponse findById(String id) {
    return userMapper.toUserResponse(userRepository.findById(id)
        .orElseThrow(() -> new ApiRequestException(ErrorCode.USER_NOT_FOUND)));
  }
}
