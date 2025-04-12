package com.kltech.authenticationservice.api.services.impls;

import com.kltech.authenticationservice.api.mappers.UserMapper;
import com.kltech.authenticationservice.api.models.dto.requests.UserRequest;
import com.kltech.authenticationservice.api.models.dto.responses.UserResponse;
import com.kltech.authenticationservice.api.services.IUserService;
import com.kltech.authenticationservice.api.models.User;
import com.kltech.authenticationservice.api.repositories.UserRepository;
import com.kltech.authenticationservice.auth.configs.db.DataSource;
import com.kltech.authenticationservice.auth.enums.DataSourceType;
import com.kltech.authenticationservice.exception.ApiRequestException;
import com.kltech.authenticationservice.exception.ErrorCode;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserMapper userMapper;
  private final UserRepository userRepository;

  @Override
  @DataSource(DataSourceType.SLAVE)
  public List<UserResponse> findAll() {
    return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
  }

  @Override
  @DataSource(DataSourceType.MASTER)
  public void update(String id, UserRequest userRequest) {
    User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

    if (userRequest.getRole() != null) {
      user.setRole(userRequest.getRole());
    }

    userMapper.toUserEntity(userRequest, user);

    userRepository.save(user);
  }

  @Override
  @DataSource(DataSourceType.MASTER)
  public void delete(String id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
    } else {
      throw new RuntimeException("User not found");
    }
  }

  @Override
  @DataSource(DataSourceType.SLAVE)
  public UserResponse findById(String id) {
    return userMapper.toUserResponse(userRepository.findById(id)
        .orElseThrow(() -> new ApiRequestException(ErrorCode.USER_NOT_FOUND)));
  }
}
