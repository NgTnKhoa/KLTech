package com.kltech.authenticationservice.api.mappers;

import com.kltech.authenticationservice.api.models.User;
import com.kltech.authenticationservice.api.models.dto.requests.UserRequest;
import com.kltech.authenticationservice.api.models.dto.responses.UserResponse;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserResponse toUserResponse(User user);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void toUserEntity(UserRequest userUpdateRequest, @MappingTarget User user);
}
